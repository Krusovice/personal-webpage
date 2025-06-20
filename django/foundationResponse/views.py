from django.shortcuts import render, redirect
from .forms import Foundation_response_linear_regression

def home(request):
    return render(request, 'foundationResponse/index.html')

def linear_regression(request):
    result=None
    form_input = ['width', 'eccentricity', 'soils']
    
    if request.method == "POST":
        form = Foundation_response_linear_regression(request.POST)
        if form.is_valid():
            cd = form.cleaned_data

            result = cd['width'] + cd['eccentricity'] + cd['soils']
            # Run calculations
            # Stay at the same page, but update a result contanier.
    else:
        form = Foundation_response_linear_regression()

    

    return render(request, "foundationResponse/linear_regression.html", {
        "form": form,
        "result": result,
        "form_input": form_input
    })