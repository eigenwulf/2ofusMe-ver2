from rest_framework import serializers
from dj_rest_auth.registration.serializers import RegisterSerializer
from .models import CustomUser, Sender, Rep, Company, RepCompanyAssignment, CompanyCampaignLevel, LevelDetail

from dj_rest_auth.registration.serializers import RegisterSerializer
from rest_framework import serializers
from allauth.account.adapter import get_adapter


class SenderSerializer (serializers.ModelSerializer):

    class Meta:
        model = Sender
        fields = ['customuser', 'sendername', 'street_address', 'locality', 'state', 'post_code']


# for deletion
class CustomRegisterSerializer(RegisterSerializer):
  username = None  # Remove username field
  password2 = None  # Remove password2 field - only require one password
    
  def validate(self, data):
    # Override allauth in order to skip password2 validation - only validate password1
    return data
    
  def get_cleaned_data(self):          
    data = super().get_cleaned_data()
    data.update({                
      'email': self.validated_data.get('email', ''),
      'password1': self.validated_data.get('password1', ''),
    })          
    return data

  def save(self, request):
    adapter = get_adapter()
    user = adapter.new_user(request)
    self.cleaned_data = self.get_cleaned_data()
    user = adapter.save_user(request, user, self, commit=False)            
    user.email = self.cleaned_data.get('email')
    user.save()

    self.custom_signup(request, user)          
    return user

class RepSerializer (serializers.ModelSerializer):
    class Meta:
        model = Rep
        fields = ['customuser', 'name', 'title','phoneNumber']
# Rep uses customuser as its primary key (primary_key=True).


# after creating Company, the campaign level may be created: GET returns full LevelDetails, POST only adds to Company field current_campaign_level field
class CompanyCampaignLevelSerializer(serializers.ModelSerializer):
    level = serializers.SlugRelatedField(
      queryset=LevelDetail.objects.all(),
      slug_field='level'   # matches LevelDetail.level CharField
      )
    
    # for GET requests, override to_representation, see below on to_repre...
    def to_representation(self, instance):
        repr = super().to_representation(instance)  # 1. runs normal serialization on CompCampSer, SlugRelatedField produces "level": "gold" as usual
        repr['level'] = LevelDetailSerializer(instance.level).data  # 2. replaces the slug field with the full nested object
        return repr

    # On POST, to_representation is never called — DRF uses to_internal_value + validate + create/update instead. So the SlugRelatedField still handles incoming writes normally, accepting "level": "free".
    class Meta:
        model = CompanyCampaignLevel
        fields = ['id', 'level', 'is_active', 'start_date', 'end_date', 'notes', 'created_by', 'created']
        read_only_fields = ['created']
# SlugRelatedField is a serializer field that allows you to represent a relationship using a specific field from the related model, typically a slug or a unique identifier.

class LevelDetailSerializer (serializers.ModelSerializer):
    class Meta:
        model = LevelDetail
        fields = ['level', 'reference_id', 'unit_price','max_quantity', 'starting_deposit', 'description' ]

class CompanySerializer (serializers.ModelSerializer):
    # define the extra field
    current_campaign_level = serializers.SerializerMethodField() #tells DRF: "for the current_campaign_level field, call a method to get the value."

    # DRF automatically looks for a method named get_<field_name> — so get_current_campaign_level is discovered and called by DRF internally. You never call it directly.
    def get_current_campaign_level(self, obj):
      level = obj.current_campaign_level  # returns LevelDetail instance or None
      return level.level if level else None  # return the string CharField value, to get around error: LevelDetail object not serializable
        # return obj.current_campaign_level  # calls the @property on Company Viewset

    class Meta:
        model = Company
        fields = ['id', 'name', 'street_address', 'locality', 'state', 'post_code', 'email', 'phoneNumber', 'current_campaign_level']


class RepCompanyAssignmentSerializer (serializers.ModelSerializer):
    class Meta:
        model = RepCompanyAssignment
        fields = ['id', 'rep', 'company']


"""
to_representation is the method DRF calls on a serializer whenever it needs to convert a model instance → a Python dict 
(i.e., on every read/GET). It's the counterpart to to_internal_value, which handles writes.

reminder- 
Serialize: convert model instance to Python and from there to JSON, etc.
De-Serializer: convert from Python to model 
"""


