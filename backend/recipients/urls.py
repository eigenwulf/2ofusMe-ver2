from django.urls import path, include
from recipients import views
from recipients.views import RecipientsViewSet, GreetingCard_RecipientViewSet, GreetingCardsRecipientsBulkView, RecipientLinkSubmissionView, CreateRecipLinkView
from rest_framework.urlpatterns import format_suffix_patterns
from rest_framework.routers import DefaultRouter

app_name = "recipients"
# API URLs are determined automatically by the router.
router = DefaultRouter()
router.register(r"recipients", RecipientsViewSet, basename="")
router.register(r'greetingcard_recipient', GreetingCard_RecipientViewSet, basename='greetingcard_recipient')

urlpatterns = [
    # api pre-formed views
    path("api/", include(router.urls)), #recipients/api/recipients or recipients/api/greetingcard_recipient

    # manual views
    path("greetingcards/recipients_bulk", GreetingCardsRecipientsBulkView.as_view(), name='greetingcards_recipients_bulk'),
        # for link submissions
    path('forms/submit/<uuid:token>/', RecipientLinkSubmissionView.as_view(), name='recip-link-submit'),  #onSubmit button to save recip data via link, 
                # <uuid:token> tells Django to extract the < > parameter from the URL, as kwargs['token'].
    path('create-link/',  CreateRecipLinkView.as_view(), name='create-link'),  #create link for recipients to fill out. Expects {"greetingcard_id": 1}

    # old google address api
    # path("confirm_fix_sub", views.confirm_fix_sub.as_view(), name="confirm_fix_sub"),
]
#rest framework suffixes
# urlpatterns = format_suffix_patterns(urlpatterns)

# HTTP method	URL	Action
# LIST      GET	/recipients/api/recipients	 your recipients
# CREATE    POST	/recipients/api/recipients	Create a recipient
# RETRIEVE  GET	/recipients/api/recipients/<id>/	Retrieve a recipient
# UPDATE    PUT/PATCH	/recipients/api/recipients/<id>/	Update your recipient
# DELETE    DELETE	/recipients/api/recipients/<id>/	Delete your recipient