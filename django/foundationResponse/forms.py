from django import forms
from django.forms import formset_factory

def float_input(label, placeholder, css_class="form-control", required=True):
    return forms.FloatField(
        label=label,
        required=required,
        widget=forms.NumberInput(attrs={
            "class": css_class,
            "placeholder": placeholder
        })
    )
    
class FoundationResponseForm(forms.Form):
    width = float_input("Width", "Enter width")
    eccentricity = float_input("Eccentricity", "Enter eccentricity")

class FoundationResponseSoilForm(forms.Form):
    level = float_input("Level", "Enter level", css_class="form-control cell")
    e_modulus = float_input("E-modulus", "Enter E-modulus", css_class="form-control cell")
    phi = float_input("Phi", "Enter phi", css_class="form-control cell", required=False)
    cohesion = float_input("Cohesion", "Enter cohesion", css_class="form-control cell", required=False)

SoilFormSet = formset_factory(FoundationResponseSoilForm, extra=1)