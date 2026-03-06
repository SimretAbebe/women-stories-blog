from rest_framework import viewsets, generics, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
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

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

    @action(detail=False, methods=['get'], permission_classes=[permissions.IsAuthenticated])
    def my_stories(self, request):
        stories = Story.objects.filter(author=request.user)
        serializer = self.get_serializer(stories, many=True)
        return Response(serializer.data)
    
    def get_queryset(self):
        if self.action in ['list', 'retrieve']:
            return Story.objects.filter(is_approved=True)
        return self.queryset
    
    serializer_class = StorySerializer
    filterset_fields = ['category']
    search_fields = ['title_en', 'title_am', 'content_en', 'content_am']

    def get_permissions(self):
        if self.action == 'create':
            return [permissions.IsAuthenticated()]
        return [permissions.AllowAny()]
