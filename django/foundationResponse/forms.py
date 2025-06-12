from django import forms

class Foundation_response_linear_regression(forms.Form):
    width = forms.FloatField(label="Width")
    load = forms.FloatField(label="Load")
    eccentricity = forms.FloatField(label="Eccentricity")
    soil_modulus = forms.FloatField(label="Soil E-modulus")