from django.urls import path
from . import views

urlpatterns = [
    path('allblogs/', views.AllBlogView.as_view()),
    path('specificBlog/<int:pk>', views.SpecificBlog),
    path('deleteBlog/', views.deleteBlog),
    path('blogCrud/',views.BlogCRUD.as_view()),
    path('blogAuthor/<int:id>', views.BlogAuthor)

]
