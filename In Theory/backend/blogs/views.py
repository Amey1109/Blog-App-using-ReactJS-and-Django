from django.shortcuts import render
from django.http import JsonResponse

from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated


from .models import Blog
from .serializer import BlogSerializer


class AllBlogView(APIView):
    def get(self, request):
        queryset = Blog.objects.all()
        serializer_object = BlogSerializer(queryset, many=True)

        return Response(serializer_object.data)


@api_view(['GET'])
def SpecificBlog(request, pk):
    blog_object = Blog.objects.get(id=pk)
    serializer_object = BlogSerializer(blog_object)
    return Response(serializer_object.data)


class BlogCRUD(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        new_blog = request.data
        serializer_object = BlogSerializer(data=new_blog)

        if serializer_object.is_valid():
            serializer_object.save()
            return Response({"message": "Blog added Successfully"})
        else:
            return Response(serializer_object.errors)

    def put(self, request):
        blog_to_be_updated = Blog.objects.get(id=request.data["id"])
        serializer_object = BlogSerializer(blog_to_be_updated, request.data)

        if serializer_object.is_valid():
            serializer_object.save()
            return Response({"message": "Blog Updated Successfully"})
        else:
            return Response(serializer_object.errors)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def BlogAuthor(request, id):
    author_blog_object = Blog.objects.filter(author=id)
    serializer_object = BlogSerializer(author_blog_object, many=True)
    return Response(serializer_object.data)


@api_view(['DELETE'])
def deleteBlog(request):
    id = request.data["id"]
  

    blog_to_be_deleted = Blog.objects.get(id=id)

    blog_to_be_deleted.delete()
    return Response({"msg": "Deleted"})
