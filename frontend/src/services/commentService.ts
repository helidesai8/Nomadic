// Author: Heli Desai
import axios from 'axios';

export const fetchComments = async (blogPostId: string) => {
    const response = await axios.get(`${import.meta.env.VITE_BASE_API_URL}/api/v1/posts/${blogPostId}/comments`);
    return response.data;
};

export const postComment = async (comment: { blogPostId: string; name: string; comment: string, ratings: number }) => {
    const response = await axios.post(`${import.meta.env.VITE_BASE_API_URL}/api/v1/posts/${comment.blogPostId}/comments`, comment);
    return response.data;
};
