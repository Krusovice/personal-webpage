from rest_framework import viewsets
from .models import StockPrice
from .serializers import StockPriceSerializer
from django.shortcuts import render


class StockPriceViewSet(viewsets.ModelViewSet):
    queryset = StockPrice.objects.all()
    serializer_class = StockPriceSerializer

def stockmarket_index(request):
    return render(request, 'stockmarket/stockmarket_index.html')