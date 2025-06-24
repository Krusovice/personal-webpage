from django.shortcuts import render, redirect
from .forms import FoundationResponseForm, FoundationResponseSoilForm
from django.http import JsonResponse


def home(request):
    return render(request, 'foundationResponse/index.html')

def linear_regression(request):
    result=None
    
    if request.method == "POST":
        form = FoundationResponseForm(request.POST)
        soil_form = FoundationResponseSoilForm(request.POST, prefix="soils")

        if form.is_valid(): #and soil_form.is_valid():
            width = form.cleaned_data['width']
            eccentricity = form.cleaned_data['eccentricity']

            #soils = [
            #    f.cleaned_data["e_modulus"]
            #    for f in soil_form.forms
            #    if f.cleaned_data and not f.cleaned_data.get("DELETE")
            #]

            result = width + eccentricity
            # Run calculations
            # Stay at the same page, but update a result contanier.
            return render(request, "foundationResponse/linear_regression.html", {
                "form": form,
                #"soil_form": soil_form,
                "result": result
            })
    else:
        form = FoundationResponseForm()
        soil_form = FoundationResponseSoilForm(prefix="soils")

    

    return render(request, "foundationResponse/linear_regression.html", {
        "form": form,
        #"soil_form": soil_form,
        "result": result
    })