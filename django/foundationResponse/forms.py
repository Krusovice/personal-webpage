from django import forms
from django.forms import formset_factory

class FoundationResponseForm(forms.Form):
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

class FoundationResponseSoilForm(forms.Form):
    e_modulus = forms.FloatField(
        label="Soil E-modulus",
        widget=forms.NumberInput(attrs={
            "class": "form-control cell",
            "placeholder": "Enter soil E-modulus"
        })
    )

SoilFormSet = formset_factory(FoundationResponseSoilForm, extra=1, can_delete=True)