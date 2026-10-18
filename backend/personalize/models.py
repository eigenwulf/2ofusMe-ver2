from django.db import models
from accounts.models import CustomUser
from django.utils import timezone

# Only one Style associated with a GreetingCard instance
class GreetingCardStyle(models.Model):
	occasion = models.CharField(max_length=50)
	style = models.CharField(max_length=50)
	file = models.CharField(max_length=50)

class GreetingCard(models.Model):
	cardstyle = models.ForeignKey(GreetingCardStyle, related_name="GreetingCard", on_delete=models.CASCADE) # related name specifies the backward relation from foreign model to this one
	customuser = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='customuser_greetingcard')
	title = models.CharField(max_length=100)
	created_at = models.DateTimeField(auto_now_add=True)
	updated_at = models.DateTimeField(auto_now=True)

# Multiple CardFields can be associated with a GreetingCard instance
class CardField(models.Model):
	card = models.ForeignKey(GreetingCard, related_name="fields", on_delete=models.CASCADE)
	order = models.PositiveIntegerField(default=0)
	text = models.TextField(blank=True, null=True)
	font = models.CharField(max_length=50, default="Arial")
	size = models.PositiveIntegerField(default=16)
	color = models.CharField(max_length=7, default="#000000")

	class Meta:
			ordering = ['order']

	# CASCADE: will remove the child object when the foreign object is deleted
