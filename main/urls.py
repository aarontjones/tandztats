from django_distill import distill_path
from . import views

urlpatterns = [
    distill_path('', views.home, name='home'),
    distill_path('aftercare/', views.aftercare, name='aftercare'),
    distill_path('booking/', views.booking, name='booking'),
    distill_path('gallery/', views.gallery, name='gallery')
]