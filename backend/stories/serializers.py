from rest_framework import serializers
from .models import Story, Category

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'


class StorySerializer(serializers.ModelSerializer):
     category_name = serializers.ReadOnlyField(source='category.name')
     class Meta:
        model = Story
        fields = '__all__'

