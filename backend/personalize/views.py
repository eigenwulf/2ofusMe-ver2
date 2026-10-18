from django.shortcuts import render
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from django.http import Http404
from django.urls import reverse_lazy
# ____________________________Django Rest Framework
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status, viewsets, permissions

from .serializers import GreetingCardSerializer, CardFieldSerializer, CardStyleSerializer
from .models import GreetingCard, CardField, GreetingCardStyle

# access to all cards created by any user
class GreetingCardViewSet(viewsets.ModelViewSet):
    queryset = GreetingCard.objects.all()
    serializer_class = GreetingCardSerializer
    permission_classes = [IsAuthenticated]

    # LIST user's greeting cards /personalize/api
    def get_queryset(self):
        return GreetingCard.objects.filter(customuser=self.request.user).order_by("-created_at")

    # CREATE new greeting card /personalize/api
    def perform_create(self, serializer):
        serializer.save(customuser=self.request.user) #do not set many=True, it is meant for multiple instances

    # UPDATE Extra safety — forbid editing someone else’s object
    #     (DRF will call this for update/partial_update/destroy). /personalize/api/<id>/
    def perform_update(self, serializer):
        if serializer.instance.customuser != self.request.user:
            raise permissions.PermissionDenied("You can edit only your own notes.")
        serializer.save()

    # DELETE   /personalize/api/<id>/
    def perform_destroy(self, instance):
        if instance.customuser != self.request.user:
            raise permissions.PermissionDenied("You can delete only your own notes.")
        instance.delete()

# A View to obtain Greeting Cards associated with a given a Customuser
# @method_decorator(csrf_exempt, name='dispatch')
class GreetingCardByUserView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, customuser_id):
        # customuser_id=request.query_params.get('customuser_id')
        # if not customuser_id:
        #     return Response({'error': 'greetingcard_pk query parameter is required.'}, status=status.HTTP_400_BAD_REQUEST)

        cards = GreetingCard.objects.filter(customuser_id=customuser_id)
        serializer = GreetingCardSerializer(cards, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
# http://127.0.0.1:8000/personalize/greetingcards/user/?customuser_id=3

# A view to pick up project where left off
class ProjectView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, greetingcard_id, format=None):
    # load single GreetingCard (return 404 if missing)
        try:
            card = GreetingCard.objects.get(pk=greetingcard_id)
        except GreetingCard.DoesNotExist:
            return Response({'detail': 'GreetingCard not found.'}, status=status.HTTP_404_NOT_FOUND)

    # card fields and style
        # qs2 = CardField.objects.filter(card_id=greetingcard_id) #many objects
        style = card.cardstyle # GreetingCardStyle instance (or None if FK allows)

        qs1ser = GreetingCardSerializer(card).data
        # qs2ser = CardFieldSerializer(qs2, many=True).data
        # qs3ser = CardStyleSerializer(style).data if style is not None else None
        result = {'project':qs1ser}

        return Response(result, status=status.HTTP_200_OK)


# @method_decorator: wraps the class inside a function called method_decorator
# csrf_exempt: applies Django's csrf_exempt decorator to the dispatch method of the class-based view
# often used for API endpoints that do not use Django's session authentication (for example, when using token or JWT authentication).

# HTTP method	URL	Action
# GET	/personalize/api/greetingcard/	List your notes
# POST	/personalize/api/greetingcard/	Create a note
# GET	/personalize/api/greetingcard/<id>/	Retrieve a note
# PUT   /personalize/api/greetingcard/<id>/ update note, send all data
# PATCH	/personalize/api/greetingcard/<id>/	Update your note, only send the modified data 
# DELETE	/personalize/api/greetingcard/<id>/	Delete your note

# https://stackoverflow.com/questions/31089221/what-is-the-difference-between-put-post-and-patch