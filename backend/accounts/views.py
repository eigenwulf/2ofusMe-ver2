from django.shortcuts import render, get_object_or_404
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from django.http import Http404
from django.urls import reverse_lazy
from django.utils import timezone 
from django.db.models import Q

# ____________________________Django Rest Framework
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework import status, viewsets, permissions

from .serializers import SenderSerializer
from .models import Sender

class SenderViewSet(viewsets.ModelViewSet):
    # provides `list`, `create`, `retrieve`, `update` and `destroy` actions.

    serializer_class = SenderSerializer
    permission_classes = [IsAuthenticated]

    # LIST Senders
    def get_queryset(self):
        return Sender.objects.filter(customuser=self.request.user)

    # CREATE new Sender
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
            raise permissions.PermissionDenied("You can delete only your own notes.")
        instance.delete()

# HTTP method	URL	Action
# GET	/accounts/sender	List your notes
# POST	/accounts/sender	Create a note
# GET	/accounts/sender/<id>/	Retrieve a Sender
# PUT / PATCH	/accounts/sender/<id>/	Update your note
# DELETE	/accounts/sender/<id>/	Delete your note

# http://127.0.0.1:8000/accounts/sender/2/







# for deletion
from .serializers import RepSerializer, CompanySerializer, RepCompanyAssignmentSerializer, CompanyCampaignLevelSerializer
from .models import Rep, Company, RepCompanyAssignment

class RepViewSet(viewsets.ModelViewSet):
    # provides `list`, `create`, `retrieve`, `update` and `destroy` actions.

    serializer_class = RepSerializer
    permission_classes = [IsAuthenticated]

    # LIST Reps
    def get_queryset(self):
        return Rep.objects.filter(customuser=self.request.user)

    # CREATE new Rep
    # def perform_create(self, serializer):
    #     serializer.save(customuser=self.request.user) #do not set many=True, it is meant for multiple instances

    # if Rep already exists, update exist Rep instead
    def create(self, request, *args, **kwargs):
        user = request.data.get('customuser')
        existing = Rep.objects.filter(Q(customuser=user)).first() #Without first(), filter() returns a queryset (a list-like object) even when empty — you can't directly check it as a single object:

        if existing:
            serializer = self.get_serializer(existing, data=request.data, partial=True) #binds the incoming data to the existing instance. partial=True means only fields provided in the request are updated; others are left unchanged.
            serializer.is_valid(raise_exception=True)
            self.perform_update(serializer) #calls your existing perform_update, which includes the ownership check before saving.
            return Response(serializer.data, status=status.HTTP_200_OK)
        return super().create(request, *args, **kwargs)

    # UPDATE Extra safety — forbid editing someone else’s object
    #     (DRF will call this for update/partial_update/destroy)
    def perform_update(self, serializer):
        if serializer.instance.customuser != self.request.user:
            raise permissions.PermissionDenied("You can edit only your own notes.")
        serializer.save()

    # DELETE 
    def perform_destroy(self, instance):
        if instance.customuser != self.request.user:
            raise permissions.PermissionDenied("You can delete only your own notes.")
        instance.delete()

# HTTP method	URL	Action
# GET	/accounts/Rep	List your notes
# POST	/accounts/Rep	Create a note
# GET	/accounts/Rep/<id>/	Retrieve a Rep
# PUT / PATCH	/accounts/Rep/<id>/	Update your note
# DELETE	/accounts/Rep/<id>/	Delete your note

# http://127.0.0.1:8000/accounts/Rep/<id>/


class CompanyViewSet(viewsets.ModelViewSet):
    # provides `list`, `create`, `retrieve`, `update` and `destroy` actions.

    serializer_class = CompanySerializer
    permission_classes = [IsAuthenticated]

    # LIST Companys
    def get_queryset(self):
        if self.request.user.rep:
          return Company.objects.filter(rep=self.request.user.rep)
        else:
          return self

    # CREATE new Company
    # def perform_create(self, serializer):
    #     # serializer.save(rep=self.request.user.representative) #do not set many=True, it is meant for multiple instances
    #     serializer.save()

    # CREATE new Company, if already exists, updates existing and return 200
    def create(self, request, *args, **kwargs):
        email = request.data.get('email')
        phone = request.data.get('phoneNumber')
        existing = Company.objects.filter(email=email).first() #Without first(), filter() returns a queryset (a list-like object) even when empty — you can't directly check it as a single object:

        if existing: #update existing Company
            serializer = self.get_serializer(existing, data=request.data, partial=True) #binds the incoming data to the existing instance. partial=True means only fields provided in the request are updated; others are left unchanged.
            serializer.is_valid(raise_exception=True)
            self.perform_update(serializer) #calls your existing perform_update, which includes the ownership check before saving.
            return Response(serializer.data, status=status.HTTP_200_OK)

        return super().create(request, *args, **kwargs)


    # UPDATE Extra safety — forbid editing someone else’s object
    #     (DRF will call this for update/partial_update/destroy)
    # def perform_update(self, serializer):
    #     if serializer.instance.rep != self.request.user.rep:
    #         raise permissions.PermissionDenied("You can edit only your own notes.")
    #     serializer.save()

    def perform_update(self, serializer):
        user_rep = self.request.user.rep
        if not serializer.instance.rep.filter(pk=user_rep.pk).exists():
            raise permissions.PermissionDenied("You can edit only your own organizations.")
        serializer.save()

    # DELETE 
    # def perform_destroy(self, instance):
    #     if instance.rep != self.request.rep:
    #         raise permissions.PermissionDenied("You can delete only your own notes.")
    #     instance.delete()

    def perform_destroy(self, instance):
        user_rep = self.request.user.rep
        if not instance.rep.filter(pk=user_rep.pk).exists():
            raise permissions.PermissionDenied("You can delete only your own organizations.")
        instance.delete()


    # @action: In DRF, for ad-hoc methods that should be routable, you can mark them as such with the @action decorator.
    @action(detail=True, methods=['get', 'post'], url_path='campaign-levels')
    def campaign_levels(self, request, pk=None):
        company = self.get_object()

        # GET will retrieve full LevelDetail via nested serializer in CompanyCampaignLevelSerializer
        if request.method == 'GET':
            entries = company.campaign_levels.filter(is_active=True)
            serializer = CompanyCampaignLevelSerializer(entries, many=True)  

            return Response(serializer.data) # serializer.data is a list of dicts, but Response sends as a JSON array
        # Entries is a queryset (potentially many rows). When you pass many=True, DRF internally replaces the serializer with a ListSerializer — a wrapper that iterates over each object and serializes it individually.

        # makes entry in current_campaign_level field
        if request.method == 'POST':
            # Deactivate current active level
            company.campaign_levels.filter(is_active=True).update(
                is_active=False, end_date=timezone.now().date()
            )
            serializer = CompanyCampaignLevelSerializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save(company=company, created_by=str(request.user))
            return Response(serializer.data, status=status.HTTP_201_CREATED)

# Method	URL	What it does
# GET	/accounts/co/	List companies, each with current_campaign_level embedded
# GET	/accounts/co/{id}/campaign-levels/	Full history for one company
# POST	/accounts/co/{id}/campaign-levels/	Set a new level (closes the previous)


class RepCompanyAssignmentViewSet(viewsets.ModelViewSet):
    # provides `list`, `create`, `retrieve`, `update` and `destroy` actions.

    serializer_class = RepCompanyAssignmentSerializer
    permission_classes = [IsAuthenticated]

    # The safer and more idiomatic filter to use is a relationship traversal, which also handles the no-Rep case gracefully (returns empty instead of erroring):
    def get_queryset(self):
        return RepCompanyAssignment.objects.filter(rep__customuser=self.request.user)

    # CREATE new Company-Rep assignment
    # def perform_create(self, serializer):
    #     serializer.save() #do not set many=True, it is meant for multiple instances

    def create(self, request, *args, **kwargs):
        company = request.data.get('company')
        rep = request.data.get('rep')
        existing = RepCompanyAssignment.objects.filter(Q(company=company) & Q(rep=rep)).first() #Without first(), filter() returns a queryset (a list-like object) even when empty — you can't directly check it as a single object:

        if existing: #gracefully return existing and 200
            # Return existing company with 200 instead of raising a 400
            return Response(self.get_serializer(existing).data, status=status.HTTP_200_OK)
        return super().create(request, *args, **kwargs)


# GET	/accounts/repco	List your notes
# POST	/accounts/repco	Create a note
# GET	/accounts/repco/<id>/	Retrieve a Rep
# PUT / PATCH	/accounts/repco/<id>/	Update your note
# DELETE	/accounts/repco/<id>/	Delete your note