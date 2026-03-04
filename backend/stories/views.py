from rest_framework import viewsets, generics, permissions
from django.contrib.auth.models import User
from .models import Category, Story
from .serializers import CategorySerializer, StorySerializer, UserSerializer

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.AllowAny]

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

    def get_permissions(self):
        if self.action == 'create':
            return [permissions.IsAuthenticated()]
        return [permissions.AllowAny()]
