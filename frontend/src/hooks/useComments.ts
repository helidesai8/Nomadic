// Author: Heli Desai
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchComments, postComment } from '../services/commentService';

interface Comment {
    id: number;
    blogPostId: number;
    name: string;
    comment: string;
    createdAt: string;
    ratings: number;
}

export const useComments = (blogPostId: string) => {
    const queryClient = useQueryClient();

    const commentsQuery = useQuery({
        queryKey: ['comments', blogPostId],
        queryFn: () => fetchComments(blogPostId),
    });

    const addCommentMutation = useMutation({
        mutationFn: postComment,
        onSuccess: () => {
            queryClient.invalidateQueries(['comments', blogPostId]);
        },
    });

    return {
        ...commentsQuery,
        addComment: addCommentMutation.mutateAsync,
    };
};
