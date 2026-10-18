# Serialize: from python into JSON
# de-Serialize: from JSON into python

from rest_framework import serializers
from .models import Recipient, GreetingCard, GreetingCard_Recipient,  RecipientLink, RecipientLinkSubmission
from personalize.models import GreetingCard

# To allow entry into the greetingcard many-to-many field of the Recipient model when using a custom through model (GreetingCard_Recipient), you need to:
# 1. Customize the RecipientSerializer to accept a list of greeting card IDs.
# 2. Override the create and update methods in the serializer to manually create or update entries in the GreetingCard_Recipient join table.

class RecipientSerializer(serializers.ModelSerializer):
    greetingcards = serializers.SerializerMethodField(read_only=True) #see below get_greetingcards, DRF auto looks for get_<field_name> method
    greetingcard_ids = serializers.ListField(child=serializers.IntegerField(), write_only=True, required=False ) #optional field, see below create, update 
    class Meta:
        model = Recipient
        fields = [
            'id', 'name', 'street_address', 'locality', 'state', 'postcode',
            'greetingcard_ids', 'greetingcards' ]
# greetingcards field: Read-only, computed on the fly by get_greetingcards(), Returns a flat list of greeting card IDs by querying the GreetingCard_Recipient through table
# greetingcard_ids field: Write-only, used to accept a list of IDs in POST/PUT/PATCH requests, It's popped from validated_data in create() and update() before Recipient.objects.create(**validated_data) is called, so Django never tries to set it as a model field, 
#       The serializer then manually creates GreetingCard_Recipient rows for each ID

# RecipientsViewSet delegates everything to RecipientSerializer. The virtual fields are fully self-contained in the serializer — the viewset just calls perform_create/perform_update which invoke the serializer's overridden create/update methods.
    def get_greetingcards(self, obj):
        # Return a list of greeting card IDs for this recipient
        return [gc.greetingcard.id for gc in GreetingCard_Recipient.objects.filter(recipient=obj)]

# create an object: providing Integer for the greetingcard_id field and Object for the recip field. 
    def create(self, validated_data):
        greetingcard_ids = validated_data.pop('greetingcard_ids', [])
        recipient = Recipient.objects.create(**validated_data)
        for gc_id in greetingcard_ids:
            GreetingCard_Recipient.objects.create(
                greetingcard_id=gc_id, #alternatively, may use greetingcard=greetingcard -> as object
                recipient=recipient
            )
        return recipient

    def update(self, instance, validated_data):
        greetingcard_ids = validated_data.pop('greetingcard_ids', None)
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        if greetingcard_ids is not None:
            # Remove old links and add new ones
            GreetingCard_Recipient.objects.filter(recipient=instance).delete()
            for gc_id in greetingcard_ids:
                GreetingCard_Recipient.objects.create(
                    greetingcard_id=gc_id,
                    recipient=instance
                )
        return instance
# POST/PUT/PATCH to the Recipient endpoint with: { "name": "John Doe", "street_address": "123 Main St", "greetingcard_ids": [1, 2, 3] }

# class RecipientSerializer (serializers.ModelSerializer):
#     class Meta:
#         model = Recipient
#         fields = ['pk', 'greetingcard', 'name', 'street_address', 'locality', 'state', 'postcode']
#         read_only_fields = ['customuser']

#     def create(self, validated_data):
#         return super().create(validated_data)


class GreetingCard_RecipientSerializer (serializers.ModelSerializer):
    class Meta:
        model = GreetingCard_Recipient
        fields = ['pk', 'greetingcard', 'recipient']



# nested RecipientSerializer: when link is submitted, Recip is created, then reciplinksubmission is created with FK to Recip
# purpose: to track submissions through the link
class RecipientLinkSubmissionSerializer(serializers.ModelSerializer):
    recipient = RecipientSerializer

    class Meta:
        model = RecipientLinkSubmission
        fields = ['link', 'recipient']

    def create(self, validated_data):
        recipient_data = validated_data.pop('recipient')
        recipient = Recipient.objects.create(**recipient_data)
        return RecipientLinkSubmission.objects.create(recipient= recipient, **validated_data)

# serializer for creation of link. 1. define greetingcard_id field so as to parse json data {greetingcard_id: 1} 
# 2. obtain GreetingCard object given id. 3. create RecipientLink object with GrCard object 
class RecipientLinkCreateSerializer(serializers.Serializer):
    greetingcard_id = serializers.IntegerField()

    def create(self, validated_data):
        greetingcard = GreetingCard.objects.get(id=validated_data['greetingcard_id'])
        return RecipientLink.objects.create(greetingcard=greetingcard)