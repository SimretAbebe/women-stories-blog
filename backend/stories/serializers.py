from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Story, Category

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'password']

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data.get('email', ''),
            password=validated_data['password']
        )
        return user

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

class StorySerializer(serializers.ModelSerializer):
    category_name = serializers.ReadOnlyField(source='category.name')
    author_username = serializers.ReadOnlyField(source='author.username')

    class Meta:
        model = Story
        fields = [
            'id', 'title_en', 'title_am', 'slug', 'image', 
            'content_en', 'content_am', 'category', 'category_name',
            'created_at', 'updated_at', 'author', 'author_username'
        ]
        read_only_fields = ['id', 'slug', 'created_at', 'updated_at', 'author']

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        if instance.image:
            representation['image'] = instance.image.url
        return representation
