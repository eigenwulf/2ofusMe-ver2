from django.urls import path, include, re_path
from dj_rest_auth.registration.views import RegisterView, VerifyEmailView, ConfirmEmailView
from dj_rest_auth.views import LoginView, LogoutView, PasswordResetView, PasswordResetConfirmView
from accounts.views import SenderViewSet, RepViewSet, CompanyViewSet, RepCompanyAssignmentViewSet
from rest_framework.routers import DefaultRouter

app_name = "accounts"
# API URLs are determined automatically by the router.
router = DefaultRouter()
router.register(r"sender", SenderViewSet, basename="")

# for deletion
router.register(r"rep", RepViewSet, basename="rep")
router.register(r"co", CompanyViewSet, basename="co")
router.register(r"repco", RepCompanyAssignmentViewSet, basename="repco")

    # These paths are automatically created by the above
    # path('rep/<int:pk>/', RepView.as_view(), name='rep'),
    # path('co', views.CompanyView.as_view(), name='co'),

urlpatterns = [

    path("", include(router.urls)),  
    path('sender/', include('dj_rest_auth.urls')), #see https://dj-rest-auth.readthedocs.io/en/latest/api_endpoints.html


    path('rep/', include('dj_rest_auth.urls')), #see https://dj-rest-auth.readthedocs.io/en/latest/api_endpoints.html
    path('co/', include('dj_rest_auth.urls')), #see https://dj-rest-auth.readthedocs.io/en/latest/api_endpoints.html
    path('repco/', include('dj_rest_auth.urls')), #see https://dj-rest-auth.readthedocs.io/en/latest/api_endpoints.html


    path('account-confirm-email/<str:key>/', ConfirmEmailView.as_view()), #the verification process to be automatic once the user opens the URL received in the email. 
    # So, we will specify an endpoint to receive the unique key of account-confirm-email then verify the user.
    # After verification, the user will be directed to the LOGIN_URL which we had earlier specified in the settings.py file.

    #email verification, see below for description
    # path('verify-email/', VerifyEmailView.as_view(), name='rest_verify_email'),
    # path('account-confirm-email/', VerifyEmailView.as_view(), name='account_email_verification_sent'),
    #     re_path(r'^account-confirm-email/(?P<key>[-:\w]+)/$', VerifyEmailView.as_view(), name='account_confirm_email'),
  
  path('password-reset/', PasswordResetView.as_view()),
  # path(‘password-reset-confirm/<uidb64>/<token>/', PasswordResetConfirmView.as_view(), name='password_reset_confirm')  
  ]

# endpoints for registering users, logging in, and logging out.
# 3 endpoints to handle the email verification process of the user registration.
# After a successful signup request, dj-rest-auth reaches out to the verify-email/ endpoint which processes the 
# email verification and ensures that an email is sent via the account-confirm-email/ endpoint to the email address supplied by the user. 
# A URL is sent along with the email message. The URL sent consists of the re_path to account-confirm-email/ and a unique key. 
# The user can then verify the email address with the URL. re_path allows us to use regular expressions in our URL
# https://dev.to/entuziaz/django-rest-framework-authentication-with-dj-rest-auth-4kli

# The password-reset endpoint is where the user makes the request to reset their password. dj-rest-auth calls unto password-reset-confirm endpoint 
# to which sends an email to the email address of the user. The email message body contains the password-reset-confirm that has a unique key to verify only that email address. 
# When the user opens the password-reset-confirm URL in the email message, they will be redirected to a new page to supply a new password for their account.

# URLS
# HTTP method	URL	Action
# GET	/accounts/rep	List
# POST	/accounts/rep	Create
# GET	/accounts/rep/<id>/	Retrieve a Sender
# PUT / PATCH	/accounts/rep/<id>/	Update your note
# DELETE	/accounts/rep/<id>/	Delete your note

# http://127.0.0.1:8000/accounts/sender/2/
