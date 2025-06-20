from django import forms

class Foundation_response_linear_regression(forms.Form):
    width = forms.FloatField(
        label="Width",
        widget=forms.TextInput(attrs={
            "class": "form-control",
            "placeholder": "Enter width"
        })
    )
    eccentricity = forms.FloatField(
        label="Eccentricity",
        widget=forms.TextInput(attrs={
            "class": "form-control",
            "placeholder": "Enter eccentricity"
        })
    )
    soils = forms.FloatField(
        label="Soil E-modulus",
        widget=forms.TextInput(attrs={
            "class": "form-control",
            "placeholder": "Enter soil E-modulus"
        })
    )