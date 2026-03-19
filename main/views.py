from django.shortcuts import render

# Create your views here.
# Home / Gallery
def home(request):
    return render(request, "home.html")

def aftercare(request):
    return render(request, "home.html")

def booking(request):
    return render(request, "booking.html")

def gallery(request):
    return render(request, "gallery.html")