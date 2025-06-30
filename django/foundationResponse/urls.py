from django.urls import path
from . import views

urlpatterns = [
    path('models/', views.home, name='foundationResponse_index'),
    path('linear_regression/', views.linear_regression, name='linear_regression')
]
