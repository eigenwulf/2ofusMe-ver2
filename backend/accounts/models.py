from django.db import models, transaction
from django.contrib.auth.models import AbstractUser

from django.core.validators import MaxValueValidator, MinValueValidator, RegexValidator
from django.core.exceptions import ValidationError
from django.db.models import F, Sum
from django.utils import timezone
import datetime
from decimal import Decimal

class CustomUser(AbstractUser):
  email = models.EmailField(unique=True)
  created = models.DateTimeField(default=timezone.now)
  updated = models.DateTimeField(auto_now=True)
  captcha_score = models.FloatField(default = 0.0)
  is_active = models.BooleanField(default = True)

  def __str__(self):
    return f'{self.email}'

class Sender (models.Model):
	customuser = models.OneToOneField(CustomUser, on_delete=models.CASCADE, related_query_name='senders', primary_key=True)
	sendername = models.CharField(verbose_name="Sender Name", max_length=50, null=False, blank=False, default='')
	street_address = models.CharField(verbose_name="Street_Address",max_length=100, null=False, blank=False, default='')
	locality = models.CharField(verbose_name="Locality",max_length=100, null=False, blank=False, default='')
	county = models.CharField(verbose_name="County",max_length=100, null=True, blank=True, default='')
	state = models.CharField(verbose_name="State",max_length=100, null=False, blank=True)
	post_code = models.CharField(verbose_name="Post Code",max_length=8, null=False, blank=True, default='')
	country = models.CharField(verbose_name="Country",max_length=100, null=True, blank=True, default='')
	updated = models.DateTimeField(auto_now=True)

	def __str__(self):
		return "%s sender, owner %s" % (self.sendername, self.customuser)

# https://djangocentral.com/understanding-related-name-in-django-models/
# related_name is an attribute that can be used to specify the name of the reverse relation 
# from the related model back to the model that defines the relation. It is used to specify 
# the name of the attribute that will be used to access the related model from the reverse side of the relation.


# Rep and Company: create them separately:
# 1. Create the Company object on its own (just provide the required fields like name, email, phoneNumber, etc.)
# 2. Create a RepCompanyAssignment entry linking a Rep to that Company

class Rep (models.Model):
  customuser = models.OneToOneField(CustomUser, on_delete=models.CASCADE, related_name='rep', primary_key=True) #The related_name='rep' allows you to access the Rep object from a CustomUser instance (e.g., user.rep).
	# Rep uses customuser as its primary key (primary_key=True).
  name = models.CharField(verbose_name="Rep Name", max_length=50, null=False, blank=False, default='')  
  title = models.CharField(verbose_name="Title", max_length=30, null=True, blank=True, default='')  
  phoneNumberRegex = RegexValidator(regex=r"^\+?1?[\d\-]{8,15}$")
  phoneNumber = models.CharField(validators=[phoneNumberRegex], max_length=16)
  socialmedia = models.CharField(verbose_name="Social Media",max_length=100, null=True, blank=True, default='')
  created = models.DateTimeField(default=timezone.now)
  updated = models.DateTimeField(auto_now=True)
	
  def __str__(self):
    return f"{self.name}"
# access the reverse relation with: rep.companies.all()

# To track which Rep is currently active for a company and which are historical, you need an intermediary model using Django's through parameter.
class RepCompanyAssignment(models.Model):
    """Tracks current and historical Rep-Company relationships"""
    rep = models.ForeignKey('Rep', on_delete=models.CASCADE, related_name='company_assignments')
    company = models.ForeignKey('Company', on_delete=models.CASCADE, related_name='rep_assignments')
    is_active = models.BooleanField(default=True)
    start_date = models.DateField(default=datetime.date.today)
    end_date = models.DateField(null=True, blank=True)
    notes = models.TextField(blank=True, default='')  # Optional: reason for change
    created = models.DateTimeField(default=timezone.now)
    updated = models.DateTimeField(auto_now=True)
    
    class Meta:
        unique_together = [['rep', 'company', 'start_date']]
        ordering = ['-start_date']
    
    def __str__(self):
        status = "Active" if self.is_active else "Inactive"
        return f"{self.rep} at {self.company} ({status})"

# no need to create RepCompanyAssignment entry first. Since rep is a ManyToManyField, it is entirely optional — Company has no required FK pointing to Rep.
class Company (models.Model):
	rep = models.ManyToManyField('Rep', through='RepCompanyAssignment', related_name='companies') # access the reverse relation with: rep.companies.all()
    # The rep field is just a query interface — it doesn't store data itself. No need to manually add on object creation
	name = models.CharField(verbose_name="Company Name", max_length=50, null=False, blank=False, default='')
	street_address = models.CharField(verbose_name="Street_Address",max_length=100, null=False, blank=False, default='')
	locality = models.CharField(verbose_name="Locality",max_length=100, null=False, blank=False, default='')
	county = models.CharField(verbose_name="County",max_length=100, null=True, blank=True, default='')
	state = models.CharField(verbose_name="State",max_length=100, null=False, blank=True)
	post_code = models.CharField(verbose_name="Post Code",max_length=8, null=False, blank=True, default='')
	country = models.CharField(verbose_name="Country",max_length=100, null=True, blank=True, default='US')
	email = models.EmailField(unique=True,null=False, blank=False, default='')
	phoneNumberRegex = RegexValidator(regex=r"^\+?1?\d{8,15}$")
	phoneNumber = models.CharField(validators=[phoneNumberRegex], max_length=16)
	current_balance = models.DecimalField(max_digits=12, decimal_places=2, default=Decimal('0.00'))
	created = models.DateTimeField(default=timezone.now)
	updated = models.DateTimeField(auto_now=True)

	@property #@property decorator allows you to access its computed value like a model attribute without parenthesis:
	def calculated_balance(self):
		agg = self.balance_entries.aggregate(total=Sum('amount'))
		return agg.get('total') or Decimal('0.00')

	def refresh_current_balance(self, *, save=True):
		self.current_balance = self.calculated_balance
		if save:
			self.save(update_fields=['current_balance'])
		return self.current_balance

	def add_balance_entry(self, *, amount, reference_id='', description='', created_by=''):
		with transaction.atomic():
			Company.objects.select_for_update().get(pk=self.pk)
			entry = CoBalanceEntry.objects.create(
				company=self,
				amount=amount,
				reference_id=reference_id,
				description=description,
				created_by=created_by,
			)
			self.refresh_from_db(fields=['current_balance'])
			return entry

	@property
	def current_campaign_level(self):
		entry = self.campaign_levels.filter(is_active=True).order_by('-start_date').first()
		return entry.level if entry else None
		#self.campaign_levels calls up the reverse accessor so a field in Company is not needed 

	def __str__(self):
		return (self.name)

# Todo: If you tell me how you plan to create balance events (admin entry, API endpoint, invoices/payments model, etc.), I can hook Company.add_balance_entry() into the right place so all balance changes go through the ledger consistently.


class CoBalanceEntry (models.Model):
	company = models.ForeignKey(Company, on_delete=models.CASCADE, related_name='balance_entries') 
	reference_id = models.CharField(verbose_name="ref_id", max_length=100, null=True, blank=True, default='')
	amount = models.DecimalField(max_digits=12, decimal_places=2, editable=False)  #“money fields” ledger-like (amount/company immutable after creation),
	description = models.CharField(verbose_name="description",max_length=100, null=True, blank=True, default='')
	created_by = models.CharField(verbose_name="created_by",max_length=100, null=True, blank=True, default='')
	created_at = models.DateTimeField(default=timezone.now)

	class Meta:
		ordering = ['created_at', 'id']
		indexes = [
			models.Index(fields=['company', 'created_at']),
		]

	def clean(self):
		if self.pk:
			original = CoBalanceEntry.objects.get(pk=self.pk)
			if original.company_id != self.company_id:
				raise ValidationError('Cannot change company on an existing balance entry.')
			if original.amount != self.amount:
				raise ValidationError('Cannot change amount on an existing balance entry. Create a reversing entry instead.')

	def save(self, *args, **kwargs):
		self.full_clean()
		if self._state.adding:
			with transaction.atomic():
				Company.objects.select_for_update().get(pk=self.company_id)
				super().save(*args, **kwargs)
				Company.objects.filter(pk=self.company_id).update(
					current_balance=F('current_balance') + self.amount
				)
			return
		super().save(*args, **kwargs)

	def delete(self, *args, **kwargs):
		with transaction.atomic():
			Company.objects.select_for_update().get(pk=self.company_id)
			amount = self.amount
			company_id = self.company_id
			super().delete(*args, **kwargs)
			Company.objects.filter(pk=company_id).update(
				current_balance=F('current_balance') - amount
			)

	def __str__(self):
		return f'{self.company_id} {self.amount} {self.created_at:%Y-%m-%d %H:%M:%S}'


class LevelDetail(models.Model):
  level = models.CharField(verbose_name="level", max_length=100, null=True, blank=True, default='') 
  reference_id = models.CharField(verbose_name="ref_id", max_length=100, null=True, blank=True, default='')
  unit_price = models.DecimalField(max_digits=12, decimal_places=2, null=True, blank=True, default=None )  #“money fields” ledger-like (amount/company immutable after creation),
  max_quantity = models.IntegerField(verbose_name="max quantity", null=True, blank=True, default=None)
  starting_deposit = models.DecimalField(max_digits=12, decimal_places=2, null=True, blank=True )  
  description = models.CharField(verbose_name="description",max_length=100, null=True, blank=True, default='')
  created_at = models.DateTimeField(default=datetime.date.today)

  def __str__(self):
    return f'{self.level}'

class CompanyCampaignLevel(models.Model):
    company    = models.ForeignKey(Company, on_delete=models.CASCADE, related_name='campaign_levels') #The related_name='campaign' allows you to access the Campaign object from a Company instance (e.g., company.campaign).
    # level      = models.CharField(max_length=10, choices=LEVEL_CHOICES)
    level      = models.ForeignKey(LevelDetail, on_delete=models.DO_NOTHING, related_name='campaign_levels') 
    is_active  = models.BooleanField(default=True)
    start_date = models.DateField(default=datetime.date.today)
    end_date   = models.DateField(auto_now=True, null=True, blank=True)
    notes      = models.TextField(blank=True, default='')
    created_by = models.CharField(max_length=100, blank=True, default='')
    # created    = models.DateTimeField(default=datetime.date.today) #datetime.date.today gives the server's local date (no timezone)
    created    = models.DateTimeField(default=timezone.now)

    class Meta:
        ordering = ['-start_date']

    def __str__(self):
        status = "active" if self.is_active else "inactive"
        return f"{self.company} — {self.level} ({status})"	


"""
Added Company.current_balance (a cached DecimalField) and wired CoBalanceEntry.save() / delete() to update it atomically:
On entry create: current_balance += amount
On entry delete: current_balance -= amount
Added convenience helpers on Company:
calculated_balance (sum of all entries)
refresh_current_balance() (recompute cache from ledger)
add_balance_entry(...) (creates entry safely)
"""

"""summary of the model relationships:

CustomUser: This model extends Django's default AbstractUser to include fields like a unique email, timestamps, and a captcha_score. 
This serves as the base for user authentication.
Representative: This model extends CustomUser using a OneToOneField. This is the correct approach to 
create a "profile" for a CustomUser that has representative-specific fields. The related_name='representative' allows you to access the Representative object from a CustomUser instance (e.g., user.representative).
Company: This model stores company details. The ManyToManyField to Representative correctly establishes a many-to-many relationship, 
allowing a representative to be associated with multiple companies and a company to have multiple representatives.

Alignment with Your Intent:
Your goal is to have a single form for creating a Company and a Representative (CustomUser), sharing phoneNumber and email.

View Logic:
Need to handle the logic of creating the three objects (CustomUser, Representative, Company) 
from a single form submission within your view and form processing logic. The email from the form 
would be used for the CustomUser, and the phoneNumber could be saved to both the Representative and Company models.

History of all Rep-Company relationships with timestamps and status tracking
#Get current Rep(s) for Company B
current_reps = company_b.rep.filter(company_assignments__is_active=True)

# Mark Rep as no longer at Company A
assignment = RepCompanyAssignment.objects.get(rep=rep_obj, company=company_a, is_active=True)
assignment.is_active = False
assignment.end_date = timezone.now().date()
assignment.save()

# Get all historical reps for a company
all_reps = company.rep_assignments.all()
historical_reps = company.rep_assignments.filter(is_active=False)

"""
