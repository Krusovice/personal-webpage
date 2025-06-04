from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='foundationResponse_index'),
]
