from django.shortcuts import render

# Create your views here.
def rust_fe_index(request):
	return render(request,'rust_fe/rust_fe_index.html')