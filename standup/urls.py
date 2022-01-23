from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('authenticate', views.index, name='index'),
    path('standUp', views.standUp, name='standUp'),
]

