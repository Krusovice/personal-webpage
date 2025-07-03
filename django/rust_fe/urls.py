from django.urls import path, include
from .views import rust_fe_index

urlpatterns = [
    path('', rust_fe_index, name='rust_fe_index'),
]
