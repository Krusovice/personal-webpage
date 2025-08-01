from django.shortcuts import render, redirect
from .forms import FoundationResponseForm, SoilFormSet
from django.http import JsonResponse
from .api_call import linear_predictor_api_call

def home(request):
    return render(request, 'foundationResponse/index.html')

def linear_regression(request):
    prediction = None
    
    if request.method == "POST":
        form = FoundationResponseForm(request.POST)
        soil_formset = SoilFormSet(request.POST, prefix="soils")

        if form.is_valid() and soil_formset.is_valid():
            width = form.cleaned_data['width']
            load = form.cleaned_data['load']
            eccentricity = form.cleaned_data['eccentricity']
            soils = [f.cleaned_data for f in soil_formset.forms]

            # Prediction based on training data using only 100 kPa load
            prediction = linear_predictor_api_call(width, eccentricity, soils)
            preidction*= load/100 # Considering a linear relationship between load and settlements
    else:
        form = FoundationResponseForm()
        soil_formset = SoilFormSet(prefix="soils")

    return render(request, "foundationResponse/linear_regression.html", {
        "form": form,
        "soil_formset": soil_formset,
        "result": prediction
    })

def documentation(request):
    return render(request, 'foundationResponse/documentation.html')