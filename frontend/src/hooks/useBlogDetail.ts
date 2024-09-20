// Author: Heli Desai
import {getBlogById, updateBlog} from '../services/blogServie';
import {useMutation, useQuery} from "@tanstack/react-query";
import { postComment } from '../services/commentService';


interface BlogComment {
  ratings: number;
  comment: string;
  createdAt: string;
  name: string;
}
interface BlogDetailResponse {
  id: number;
  title: string;
  category: string;
  description: string;
  thumbnail: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  userId: number;
  comments: BlogComment[];
}

const useBlogDetail = (blogId: string) => {
    const blogDetailQuery = useQuery<BlogDetailResponse>({
      queryKey: ['blog', blogId],
      queryFn: () => getBlogById(blogId),
    });

    const updateBlogMutation = useMutation({
      mutationFn: async (data: {
        title: string;
        content: string;
        category: string;
        description: string;
        thumbnail: string;
        userId: number;
    }) => {
          await updateBlog(blogId, data);
      },
      onSettled: () => {
        blogDetailQuery.refetch();
      }
    });

    const addCommentMutation = useMutation({
      mutationFn: async (newComment: { name: string; comment: string; ratings: number }) => {
        return await postComment({ blogPostId: blogId, ...newComment });
      }, 
      onSettled: () => {
        blogDetailQuery.refetch();
      }
    });
  
    return {
      blogDetail: blogDetailQuery.data,
      blogDetailLoading: blogDetailQuery.isLoading,
      blogDetailError: blogDetailQuery.error,
      addCommentMutation,
      updateBlogMutation
    }
  };
  
  export default useBlogDetail;