from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CategoryViewSet, StoryViewSet

router = DefaultRouter()
router.register(r'categories', CategoryViewSet)
router.register(r'stories', StoryViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
