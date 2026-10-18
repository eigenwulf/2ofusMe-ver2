from django.db import models
# from django.contrib.auth.models import User
from accounts.models import CustomUser, Sender
from personalize.models import GreetingCard
import uuid
from django.utils import timezone

# TO DO: remove defaults.  Recipient is confirmed to receive a card if the card object is confirmed.
# many to many: A recipient can have many greeting card objects, and a greeting card object can have many recipients
class Recipient(models.Model):
	# CASCADE: removes child object when the foreign object is deleted
	customuser = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='recipient')
	greetingcard = models.ManyToManyField(GreetingCard, through="GreetingCard_Recipient", related_name='greetingcard', blank=True) # related name specifies the backward relation from foreign model to this one. blank=true makes a manytomany optional, The join table name is recipients_recipient_greeting_card
	name = models.CharField(verbose_name="Name",max_length=100, null=False, blank=False, default = 'Name')
	address_request = models.BooleanField(null=True, blank=True)
	street_address = models.CharField(max_length=120, null=False, blank=True )
	apt_floor_suite = models.CharField(max_length=24, null=False, blank=True )
	locality = models.CharField(verbose_name="Locality",max_length=100, null=False, blank=True)
	state = models.CharField(verbose_name="State",max_length=100, null=False, blank=True)
	postcode = models.CharField(verbose_name="Postal Code",max_length=10, null=False, blank=True)
	country = models.CharField(verbose_name="Country",max_length=100, null=True, blank=True, default = 'United States')
	created_at = models.DateTimeField(default=timezone.now)
	updated_at = models.DateTimeField(auto_now=True)

	def __str__(self):
		return f'{self.name}'

	class Meta:
		constraints = [models.UniqueConstraint(fields=['name', 'street_address'], name='unique_name_streetaddress') ]


# join table for many to many field, can be removed to let django build one implicitly
class GreetingCard_Recipient (models.Model):
	greetingcard=models.ForeignKey(GreetingCard, on_delete=models.CASCADE)
	recipient=models.ForeignKey(Recipient, on_delete=models.CASCADE)
	class Meta:
		constraints = [models.UniqueConstraint(fields=['greetingcard', 'recipient'], name='unique_greetingcard_recipient') ]
# Create your models here.



# TO DO: add FK to GreetingCard object
# LINK MODEL for sending to recipients to enter address
class RecipientLink(models.Model):
	greetingcard = models.ForeignKey(GreetingCard, on_delete=models.CASCADE, related_name='recipient_link')
	token = models.UUIDField(default=uuid.uuid4, unique=True)
	created_at = models.DateTimeField(auto_now_add=True)

# track who submitted via the link
class RecipientLinkSubmission(models.Model):
	link = models.ForeignKey(RecipientLink, on_delete=models.CASCADE)
	recipient = models.ForeignKey(Recipient, on_delete=models.CASCADE)
	submitted_at = models.DateTimeField(auto_now_add=True)
	



"""
blank=True means that field is not required for validation. null=True allows you to save a null value.
Avoid using null on string-based fields such as CharField and TextField. If a string-based field has null=True, that means it has two possible values for “no data”: NULL, and the empty string.
If a field has blank=True, form validation will allow entry of an empty value. If a field has blank=False, the field will be required.
blank=True can be used with fields having null=False, but this will require implementing clean() on the model to supply any missing values.
to make field optional: blank=True, null=True
to make field allow null: blank=True, null=True 
"""