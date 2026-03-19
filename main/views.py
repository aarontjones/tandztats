from django.shortcuts import render

# Create your views here.
# Home / Gallery
def home(request):
    return render(request, "home.html")

def aftercare(request):
    return render(request, "home.html")

def about(request):
    return render(request, "about.html")

def gallery(request):
    return render(request, "gallery.html")