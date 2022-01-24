from django.urls import path, re_path
from . import views

urlpatterns = [
    path('standUp', views.standUp, name='standUp'),
    re_path(r'.*', views.crutch, name='crutch'),  # Assume any urls not known to backend are known to react app
]

