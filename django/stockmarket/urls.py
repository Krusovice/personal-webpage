from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import StockPriceViewSet, stockmarket_index

router = DefaultRouter()
router.register(r'stock_prices', StockPriceViewSet)

urlpatterns = [
    path('api/', include(router.urls)),
    path('', stockmarket_index, name='stockmarket_index'),
]
