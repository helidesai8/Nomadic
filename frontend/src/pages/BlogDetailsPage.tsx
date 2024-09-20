// Author: Heli Desai
import React from 'react';
import { useParams } from 'react-router-dom';
import BlogDetails from '../components/blog/BlogDetail';
import MainLayout from '../components/blog/MainLayout';
import CommentList from '../components/blog/CommentList';
import CommentForm from '../components/blog/CommentForm';
import useBlogDetail from '../hooks/useBlogDetail';

const BlogDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { blogDetail, blogDetailLoading, blogDetailError, addCommentMutation } = useBlogDetail(id || '');
  const handleCommentSubmit = async ({
    name,
    comment,
    rating,
  }: {
    name: string;
    comment: string;
    rating: number;
  }) => {
    try {
      await addCommentMutation.mutateAsync({ name, comment, ratings: rating });
    } catch (error) {
      console.error('Failed to add comment:', error);
    }
  }
  console.log(blogDetail);

  if (blogDetailLoading) return <div className="text-center mt-10">Loading...</div>;

  // Handle error state
  if (blogDetailError) return <div className="text-center mt-10 text-red-500">Error loading blog</div>;

  return (
    <MainLayout>
      <main>
        <BlogDetails blogDetail={blogDetail} />
          <CommentForm onSubmit={handleCommentSubmit}/>
          <CommentList comments={blogDetail.comments}/>
      </main>
    </MainLayout>
  );
};

export default BlogDetailsPage;
