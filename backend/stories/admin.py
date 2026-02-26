from django.contrib import admin
from .models import Category, Story

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    prepopulated_fields = {'slug': ('name',)}

@admin.register(Story)
class StoryAdmin(admin.ModelAdmin):
    list_display = ('title_en', 'category', 'is_approved', 'created_at')
    list_filter = ('is_approved', 'category')
    search_fields = ('title_en', 'title_am', 'content_en', 'content_am')
    prepopulated_fields = {'slug': ('title_en',)}

