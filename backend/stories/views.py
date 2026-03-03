from rest_framework import viewsets
from .models import Category, Story
from .serializers import CategorySerializer, StorySerializer

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class StoryViewSet(viewsets.ModelViewSet):
    queryset = Story.objects.all()
    
    def get_queryset(self):
        if self.action in ['list', 'retrieve']:
            return Story.objects.filter(is_approved=True)
        return self.queryset
    
    serializer_class = StorySerializer
