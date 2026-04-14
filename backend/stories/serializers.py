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
    image = serializers.SerializerMethodField()

    class Meta:
        model = Story
        fields = '__all__'

    def get_image(self, obj):
        if obj.image:
            return obj.image.url
        return None
