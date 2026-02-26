from django.db import models

class Category(models.Model):
    name = models.CharField(max_length=100)
    slug = models.SlugField(unique=True)

    def __str__(self):
        return self.name
class Story(models.Model):
    title_en = models.CharField(max_length=200)
    title_am= models.CharField(max_length=200)
    slug = models.SlugField(unique=True)
    image = models.ImageField(upload_to='stories/', blank=True, null=True)
    content_en = models.TextField()
    content_am= models.TextField()
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='stories')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_approved = models.BooleanField(default=False)


    def __str__(self):
        return self.title_en


