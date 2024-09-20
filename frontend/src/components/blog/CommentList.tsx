// author: Heli Desai


import React from 'react';
import { format } from 'date-fns';
import Rating from '@mui/material/Rating';

const CommentList: React.FC<{ comments: any }> = ({ comments }) => {
    return (
        <div className="mt-8 mx-20">
            <h2 className="text-2xl font-bold mb-6">Reviews and Comments</h2>
            {comments.length === 0 ? (
                <p className="text-gray-500">No comments yet. Be the first to comment!</p>
            ) : (
                comments.map((comment, index) => (
                    <div key={index} className="mb-6 p-4 shadow-lg rounded-lg bg-white">
                        <div className="flex items-center space-x-4 mb-2">
                            <div>
                                <p className="text-lg font-semibold">
                                    {comment.name || 'Anonymous'}
                                </p>
                                <p className="text-gray-400 text-sm">
                                    {format(new Date(comment.createdAt), 'PPP')}
                                </p>
                            </div>
                        </div>
                        <Rating value={comment.ratings} readOnly />
                        <p className="text-gray-800">{comment.comment}</p>
                    </div>
                ))
            )}
        </div>
    );
};

export default CommentList;
