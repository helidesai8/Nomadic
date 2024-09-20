// author: Heli Desai


import React, { useState } from 'react';
import { Rating } from '@mui/material';

const CommentForm: React.FC<{ onSubmit: ({
    name,
    comment,
    rating,
}: {
    name: string;
    comment: string;
    rating: number
}) => Promise<any> }> = ({ onSubmit }) => {
    const [name, setName] = useState('');
    const [comment, setComment] = useState('');
    const [rating, setRating] = useState<number>(0);
    const [errors, setErrors] = useState<{ name?: string, comment?: string, rating?: string }>({});

    const validateForm = () => {
        const newErrors: { name?: string, comment?: string, rating?: string } = {};
        if (!name.trim()) newErrors.name = 'Name is required';
        if (!comment.trim()) newErrors.comment = 'Comment is required';
        if (rating === 0) newErrors.rating = 'Rating is required';
        return newErrors;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        const newComment = { name, comment, rating };
        try {
            await onSubmit(newComment);
            setName('');
            setComment('');
            setRating(0);
            setErrors({});
        } catch (error) {
            console.error("Failed to add comment:", error);
        }
    };

    return (
        <form className="mx-20 bg-white p-6 shadow-md rounded-md" onSubmit={handleSubmit}>
            <h2 className="text-2xl font-bold mb-4">Leave a Comment</h2>
            <div className="mb-4">
                <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
                    Name
                </label>
                <input
                    type="text"
                    id="name"
                    className={`w-full px-3 py-2 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring focus:ring-blue-500`}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
            </div>
            <div className="mb-4">
                <label htmlFor="comment" className="block text-gray-700 font-bold mb-2">
                    Comment
                </label>
                <textarea
                    id="comment"
                    className={`w-full px-3 py-2 border ${errors.comment ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring focus:ring-blue-500`}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                ></textarea>
                {errors.comment && <p className="text-red-500 text-sm">{errors.comment}</p>}
            </div>
            <div className="mb-4">
                <label htmlFor="rating" className="block text-gray-700 font-bold mb-2">
                    Rating
                </label>
                <Rating
                    name="rating"
                    value={rating}
                    onChange={(event, newValue) => {
                        setRating(newValue || 0);
                    }}
                />
                {errors.rating && <p className="text-red-500 text-sm">{errors.rating}</p>}
            </div>
            <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            >
                Submit
            </button>
        </form>
    );
};

export default CommentForm;
