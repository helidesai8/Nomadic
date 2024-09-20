// author: Smit Patel
import { format } from "date-fns";
import React from "react";
import { Link } from "react-router-dom";

const BlogCard = ({
    title,
    date,
    image,
    id,
}: {
    title: string;
    date: string;
    image: string;
    id: number;
}) => {
    return (
        <Link to={`/blogs/${id}`} className="w-full">
        <div >
            <div className="w-full h-96 overflow-hidden rounded-xl">
                <img
                    className="object-cover h-full w-full"
                    src={image}
                    alt={title}
                />
            </div>
            <h4 className="font-semibold tracking-tight my-4">
                {title}
            </h4>
            <p className="text-grey">{format(new Date(date), 'MM-dd-yyyy')}</p>
        </div>
        </Link>
    );
};

export default BlogCard;
