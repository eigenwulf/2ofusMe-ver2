from django.urls import path
from home import views

app_name = "home"
urlpatterns = [
    # class-based view
    path("", views.Home.as_view(), name="home")
]