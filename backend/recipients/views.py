from django.views import View
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from django.urls import reverse
from collections import defaultdict
# ____________________________Django Rest Framework
from rest_framework.views import APIView, View
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status, viewsets, generics, permissions

from .models import Recipient, GreetingCard_Recipient
from personalize.models import GreetingCard
from .serializers import RecipientSerializer, GreetingCard_RecipientSerializer, RecipientLinkSubmissionSerializer, RecipientLinkCreateSerializer


# serializer modified to allow updating of greetingcard field along with Recipient object
class RecipientsViewSet(viewsets.ModelViewSet):

    serializer_class = RecipientSerializer
    permission_classes = [IsAuthenticated]

    # LIST user's recipients
    def get_queryset(self):
        return Recipient.objects.filter(customuser=self.request.user).order_by("-created_at")

    # CREATE new recipient
    def perform_create(self, serializer):
        serializer.save(customuser=self.request.user) #do not set many=True, it is meant for multiple instances

    # UPDATE Extra safety — forbid editing someone else’s object
    #     (DRF will call this for update/partial_update/destroy)
    def perform_update(self, serializer):
        if serializer.instance.customuser != self.request.user:
            raise permissions.PermissionDenied("You can edit only your own notes.")
        serializer.save()

    # DELETE 
    def perform_destroy(self, instance):
        if instance.customuser != self.request.user:
            raise permissions.PermissionDenied("You can delete only your own addresses.")
        instance.delete()

# HTTP method	    URL	            Action
# GET	/recipients/api/recipients/	List your recipients
# POST	/recipients/api/recipients/	Create a recipients
# GET	/recipients/api/recipients/<id>/	Retrieve
# PUT / PATCH	/recipients/api/recipients/<id>/	Update
# DELETE	/recipients/api/recipients/<id>/	Delete


#  To make api query/mutation via recipient_id or greeting_id or both
#  To query or mutate the GreetingCard_Recipient model
class GreetingCard_RecipientViewSet(viewsets.ModelViewSet):
    serializer_class = GreetingCard_RecipientSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        queryset = GreetingCard_Recipient.objects.all()
        greetingcard_id = self.request.query_params.get('greetingcard_id')
        recipient_id = self.request.query_params.get('recipient_id')
        id = self.request.query_params.get('id')
        if greetingcard_id:
            queryset = queryset.filter(greetingcard_id=greetingcard_id)
        if recipient_id:
            queryset = queryset.filter(recipient_id=recipient_id)

        if id:
            queryset = queryset.filter(id=id)
        return queryset.order_by("-id")

    # Retrieve by greetingcard_id or recipient_id (via query params)
    def retrieve(self, request, *args, **kwargs):
        greetingcard_id = request.query_params.get('greetingcard_id')
        recipient_id = request.query_params.get('recipient_id')
        queryset = self.get_queryset()
        if greetingcard_id and recipient_id:
            obj = queryset.filter(greetingcard_id=greetingcard_id, recipient_id=recipient_id).first()
        elif greetingcard_id:
            obj = queryset.filter(greetingcard_id=greetingcard_id).first()
        elif recipient_id:
            obj = queryset.filter(recipient_id=recipient_id).first()
        else:
            obj = self.get_object()
        if not obj:
            return Response({'error': 'Object not found.'}, status=status.HTTP_404_NOT_FOUND)
        serializer = self.get_serializer(obj) #allowing REST framework to render the response into the correct content type for us.
        return Response(serializer.data)   #returns JSON

    # Update by greetingcard_id or recipient_id (via query params)
    def update(self, request, *args, **kwargs):
        greetingcard_id = request.data.get('greetingcard_id')
        recipient_id = request.data.get('recipient_id')
        queryset = self.get_queryset()
        obj = None
        if greetingcard_id and recipient_id:
            obj = queryset.filter(greetingcard_id=greetingcard_id, recip_id=recipient_id).first()
        elif greetingcard_id:
            obj = queryset.filter(greetingcard_id=greetingcard_id).first()
        elif recipient_id:
            obj = queryset.filter(recip_id=recipient_id).first()
        else:
            obj = self.get_object()
        if not obj:
            return Response({'error': 'Object not found.'}, status=status.HTTP_404_NOT_FOUND)
        serializer = self.get_serializer(obj, data=request.data, partial=True) #converts to python data type
        serializer.is_valid(raise_exception=True)
        serializer.save()  
        return Response(serializer.data)

# MAY NOT BE NEEDED
    # def perform_create(self, serializer):
    #     # If you want to associate the current user, or add custom logic
    #     serializer.save(customuser=self.request.user)

    # Delete by greetingcard_id or recipient_id (via request data) Instead, using default destroy with relation id
    def destroy_NOT_USED(self, request, *args, **kwargs):
        # greetingcard_id = request.data.get('greetingcard')
        # recipient_id = request.data.get('recipient')
        greetingcard_id = request.query_params.get('greetingcard_id')
        recipient_id = request.query_params.get('recipient_id')
        id = request.query_params.get('id')
        queryset = self.get_queryset()
        obj = None
        if greetingcard_id and recipient_id:
            obj = queryset.filter(greetingcard_id=greetingcard_id, recipient_id=recipient_id).first()
        elif greetingcard_id:
            obj = queryset.filter(greetingcard_id=greetingcard_id).first()
        elif recipient_id:
            obj = queryset.filter(recipient_id=recipient_id).first()
        elif id:
            obj = queryset.filter(id=id).first()
        else:
            obj = self.get_object()  # DOES THIS ERASE EVERYTHING? 
        if not obj:
            return Response({'error': 'Object not found.'}, status=status.HTTP_404_NOT_FOUND)
        obj.delete()
        return Response({'detail': 'Deleted successfully.'}, status=status.HTTP_204_NO_CONTENT)

# Accepts a list of greetingcard IDs and returns recipients grouped per greetingcard
class GreetingCardsRecipientsBulkView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, format=None):
        # REQUEST 
        # expect JSON: { "greetingcard_ids": [1,2,3] }
        ids = request.data.get('greetingcard_ids') or request.data.get('ids')
        if not isinstance(ids, list) or not ids:  #if ids is not an instance of class list, or ids doesn't exist
            return Response({'error': 'greetingcard_ids must be a non-empty list'}, status=status.HTTP_400_BAD_REQUEST)

        # QUERY 
        qs = GreetingCard_Recipient.objects.filter(greetingcard_id__in=ids).select_related('recipient') #Build django queryset of GreetingCard_Recipient rows, select_related tells django to do a join and load related Recipient object.
        # qs_cards = GreetingCard.objects.filter(ids)

            # Convert queryset qs to a dict {'id: [Recipient Objects],...}
        grouped = defaultdict(list) #defaultdict used below to generate empty list for each key, rel.greetingcard_id, then appends recipient data to the just-generated empty list.
        for rel in qs: 
            grouped[rel.greetingcard_id].append(RecipientSerializer(rel.recipient).data)  #RecipientSerializer(rel.recip).data produces a JSON-ready dict. result is {id: [Recipient object] }

        # RESPONSE
            # convert query to response array, preserve request order and include empty lists for ids with no recipients
        result = []
        for gid in ids:
            try:
                key = int(gid)
            except (TypeError, ValueError):
                key = gid
            result.append({'greetingcard_id': key, 'recipients': grouped.get(key, [])}) #get retrieves the value for a specified key and allows you to provide a default value if the key is not found. 

        return Response(result, status=status.HTTP_200_OK)

# Usage: expects {"greetingcard_ids": [1,2,3]} to /recipients/api/greetingcards/recipients/bulk/ — response is a list of objects [ { "greetingcard_id": 34, "recipients": [ { "id": 32, "name": "Spiderman5", "greetingcards": [34, 36] },...]



# URL Link View
# 1. url of link leads to view 2. obtains uuid token from url, 3. looks up link given token, 4.sends to serializer 5. serializer creates recipient, then instantiates reciplinksubmission object
# associated url path('api/forms/submit/<uuid:token>/')
class RecipientLinkSubmissionView(generics.CreateAPIView):
    serializer_class=RecipientLinkSubmissionSerializer

    def perform_create(self, serializer):
        token = self.kwargs['token'] #grabs token from url. self.kwargs['token'] = UUID('ea6eac52')
        recip_link = RecipientLink.objects.get(token=token) #looks up token 
        serializer.save(link=recip_link) #sends to serializer
# The part <uuid:token> tells Django to extract the keyword parameter between <> from the URL. It passes that parameter into the view as kwargs['token'], and accessed as self.kwargs.

class CreateRecipLinkView(APIView):
    permission_classes = [IsAuthenticated]
    
    def post(self, request):
        serializer = RecipientLinkCreateSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        link = serializer.save()
        token = link.token
        # specify a custom url for this view
        full_url = request.build_absolute_uri(
            reverse('recip-link-submit', kwargs={'token':token})
            )
        return Response ({
            'token': str(token),
            'link': full_url
        }, status=status.HTTP_201_CREATED)




""" Filtering - add django-filter and set filter_backends for more sophisticated queries (e.g. by date).
Use queryset = ... if all users see the same data (e.g., a public feed or admin-only list).
Use get_queryset() if you need to filter based on the request, such as showing only the current user's objects."""

"""@method_decorator: Not necessary if using DRF's ModelViewSet. 
 APIs, which typically use token authentication and do not require CSRF protection for non-browser clients.
If you use SessionAuthentication and make requests from a browser, DRF will handle CSRF tokens for you."""