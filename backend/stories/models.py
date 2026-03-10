from django.db import models
from django.utils.text import slugify
from django.contrib.auth.models import User

class Category(models.Model):
    name = models.CharField(max_length=100)
    slug = models.SlugField(unique=True)

    def __str__(self):
        return self.name

class Story(models.Model):
    title_en = models.CharField(max_length=200)
    title_am= models.CharField(max_length=200 , blank=True , null=True)
    slug = models.SlugField(unique=True, blank=True)
    image = models.ImageField(upload_to='stories/', blank=True, null=True)
    content_en = models.TextField()
    content_am= models.TextField(blank=True , null=True)
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='stories')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_approved = models.BooleanField(default=False)
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='stories' , null=True, blank=True)

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title_en)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.title_en


