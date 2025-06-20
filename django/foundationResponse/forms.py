from django import forms

class Foundation_response_linear_regression(forms.Form):
    width = forms.FloatField(label="Width")
    eccentricity = forms.FloatField(label="Eccentricity")
    soils = forms.FloatField(label="Soil E-modulus")