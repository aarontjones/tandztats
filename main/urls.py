from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('aftercare/', views.aftercare, name='aftercare'),
    path('booking/', views.booking, name='booking'),
    path('gallery/', views.gallery, name='gallery')
]