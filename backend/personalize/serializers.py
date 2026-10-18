from rest_framework import serializers
from .models import GreetingCard, CardField, GreetingCardStyle

class CardStyleSerializer(serializers.ModelSerializer):
    class Meta:
        model = GreetingCardStyle
        fields = ['occasion', 'style', 'file']

class CardFieldSerializer(serializers.ModelSerializer):
    class Meta:
        model = CardField
        fields = ['order', 'text', 'font', 'size', 'color']


class GreetingCardSerializer(serializers.ModelSerializer):
    fields = CardFieldSerializer(many=True)
    cardstyle = CardStyleSerializer(required=False, allow_null=True)

    class Meta:
        model = GreetingCard
        fields = ['id', 'title', 'cardstyle', 'fields', 'updated_at']

# cardstyle and fields are model instances presented as dicts

    def create(self, validated_data):
        fields_data = validated_data.pop('fields', [])
        style_data = validated_data.pop('cardstyle', [])

        # create or get the style object if style_data provided
        style_obj = None
        if style_data:
            style_obj, _ = GreetingCardStyle.objects.get_or_create(**style_data) #Python’s "dictionary unpacking" operator — it expands a dict into keyword arguments when calling a function.
        # create the greeting card, linking the style if present
        if style_obj:
            card = GreetingCard.objects.create(cardstyle=style_obj, **validated_data)
        else:
            card = GreetingCard.objects.create(**validated_data)

        # create card fields
        for field_data in fields_data:
            CardField.objects.create(card=card, **field_data)

        return card

    def update(self, instance, validated_data):
        # handle nested updates for cardstyle and fields
        fields_data = validated_data.pop('fields', None)
        style_data = validated_data.pop('cardstyle', None)

        # update simple GreetingCard fields
        for attr, value in validated_data.items():
            setattr(instance, attr, value)

        # update or create style
        if style_data is not None:
            style_obj, _ = GreetingCardStyle.objects.get_or_create(**style_data)
            instance.cardstyle = style_obj

        instance.save()

        # replace card fields if provided
        if fields_data is not None:
            # remove existing fields and recreate (adjust if you want partial update)
            CardField.objects.filter(card=instance).delete()
            for field_data in fields_data:
                CardField.objects.create(card=instance, **field_data)

        return instance



# class GreetingCardSerializer(serializers.ModelSerializer):
#     fields = CardFieldSerializer(many=True)
#     cardstyle=(CardStyleSerializer)
#     class Meta:
#         model = GreetingCard
#         fields = ['id', 'title', 'cardstyle', 'fields', 'updated_at']

# # TO DO: CREATE THEN UPDATE THE TEXT FIELD WHEN GREETINGCARD OBJECT IS CREATED
# # Create and return new GreetingCard, CardField, CardStyle instances, given the validated data.
#     def create(self, validated_data):
#         fields_data = validated_data.pop('fields') #separates 'fields' into new array fields_data
#         style_data = validated_data.pop('style')
#         card = GreetingCard.objects.create(**validated_data) #creates GreetingCard object from 'title' field
#         for field_data in fields_data:  #iterates over fields_data to create fields objects
#             CardField.objects.create(card=card, **style_data, **field_data)  #The ** operator "unpacks" the dictionary so each key-value pair becomes a separate keyword argument in the function call. same as (card=card, order=1, text='Hello',
#         return card

""" The ** dictionary unpacker
If style_data is a dict like {'occasion': 'Birthday', 'style': 'Modern'}, then:
GreetingCardStyle.objects.get_or_create(**style_data) is equivalent to GreetingCardStyle.objects.get_or_create(occasion='Birthday', style='Modern').
"""