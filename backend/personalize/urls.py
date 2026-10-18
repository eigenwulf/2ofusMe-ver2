from django.urls import path, include
from personalize import views
from personalize.views import GreetingCardViewSet, GreetingCardByUserView, ProjectView
from rest_framework.routers import DefaultRouter
from rest_framework.urlpatterns import format_suffix_patterns

app_name = "personalize"
# API URLs are determined automatically by the router.
router = DefaultRouter()
router.register(r"greetingcard", GreetingCardViewSet, basename="")

urlpatterns = [
    # api pre-formed views
    path("api/", include(router.urls)), #personalize/api/greetingcard

    # manual views
    path("greetingcards/user/<int:customuser_id>/", GreetingCardByUserView.as_view() ),
    path("project/<int:greetingcard_id>/", ProjectView.as_view() ),

    # http://127.0.0.1:8000/personalize/greetingcards/user/?customuser_id=3

]

#rest framework suffixes
# urlpatterns = format_suffix_patterns(urlpatterns)

# LIST      GET	/personalize/api/greetingcard	 your greeting cards
# CREATE    POST	/personalize/api/personalize	Create a greeting card
# RETRIEVE  GET	/personalize/api/personalize/<id>/	Retrieve a recipient
# UPDATE    PUT/PATCH	/personalize/api/personalize/<id>/	Update your recipient
# DELETE    DELETE	/personalize/api/personalize/<id>/	Delete your recipient

