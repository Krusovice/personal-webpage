from django.shortcuts import render

# Create your views here.

def about_index(request):
    return render(request, 'about/about_index.html')