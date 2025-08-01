from django import forms
from django.forms import formset_factory

def float_input(label, placeholder, css_class="form-control", required=True, disabled=False):
    attrs = {
        "class": css_class,
        "placeholder": placeholder,
    }
    if disabled:
        attrs["disabled"] = "disabled"

    return forms.FloatField(
        label=label,
        required=required,
        widget=forms.NumberInput(attrs=attrs)
    )
    
class FoundationResponseForm(forms.Form):
    width = float_input(label="Width", placeholder="1-4")
    load = float_input(label="Load", placeholder="100", required=False)
    eccentricity = float_input(label="Eccentricity", placeholder="0.0-0.3")

class FoundationResponseSoilForm(forms.Form):
    level = float_input("Level", "Enter level", css_class="form-control cell")
    e_modulus = float_input("E-modulus", "10-100", css_class="form-control cell")
    phi = float_input("Phi", "40", css_class="form-control cell", required=False, disabled=True)
    cohesion = float_input("Cohesion", "300", css_class="form-control cell", required=False, disabled=True)

SoilFormSet = formset_factory(FoundationResponseSoilForm, extra=1)