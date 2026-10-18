from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    # apps
    path("admin/", admin.site.urls),
    path('', include('home.urls'), name='home'),
    path('accounts/', include('accounts.urls'), name='accounts'),
    path('personalize/', include('personalize.urls'), name='personalize'),
    path('recipients/', include('recipients.urls'), name='recipients'),

    # allauth
    path('accounts/allauth', include('allauth.urls'), name='allauth'), #allauth urlpatterns

    # #dj-rest-auth, replaces /dj-rest-auth/
    path('api/auth/', include('dj_rest_auth.urls')), #see https://dj-rest-auth.readthedocs.io/en/latest/api_endpoints.html
    path('api/auth/registration/', include('dj_rest_auth.registration.urls')),

]

""" 
    POST /api/auth/login/ - Obtain token
    POST /api/auth/logout/ - Revoke token
    POST /api/auth/password/reset/ - Request password reset
    POST /api/auth/password/change/ - Change password
    GET /api/auth/user/ - Get current user
    POST /api/auth/registration/ - Register new user via allauth

    authenticated USER's information
    GET/PUT/PATCH /api/auth/user/

"""