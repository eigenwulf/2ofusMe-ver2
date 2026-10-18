from django.shortcuts import render
import html
from django.contrib.auth import authenticate, login
from django.shortcuts import redirect, render
from django.urls import reverse, reverse_lazy  # noqa: I001
from django.utils.http import urlencode
from django.views import View
from django.http import HttpResponse
from django.views.generic import TemplateView

class Home(View):
    template = "home/home.html"
    # success_url = reverse_lazy("accounts/signup")

    def get(self, request):
        return render(request, self.template)

    def post(self, request):

        return redirect(self.success_url)


# def home(request):
#     return HttpResponse("Hello, world. You're home.")