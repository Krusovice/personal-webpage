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
    level = forms.FloatField(
        label="Level",
        widget=forms.NumberInput(attrs={
            "class": "form-control cell",
            "placeholder": "Enter level"
        })
    )
    e_modulus = forms.FloatField(
        label="E-modulus",
        widget=forms.NumberInput(attrs={
            "class": "form-control cell",
            "placeholder": "Enter E-modulus"
        })
    )
    phi = forms.FloatField(
        label="Phi",
        required=False,
        widget=forms.NumberInput(attrs={
            "class": "form-control cell",
            "placeholder": "Enter phi"
        })
    )
    cohesion = forms.FloatField(
        label="Cohesion",
        required=False,
        widget=forms.NumberInput(attrs={
            "class": "form-control cell",
            "placeholder": "Enter cohesion"
        })
    )

SoilFormSet = formset_factory(FoundationResponseSoilForm, extra=1)