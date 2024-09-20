// author: Smit Patel
import React from "react";

const TestimonialCard = ({
    name,
    designation,
    review,
}: {
    name: string;
    designation: string;
    review: string;
}) => {
    return (
        <div className="mx-8 md:mx-32 my-8">
            <div className="flex items-center ">
                <div className="w-24 h-24 rounded-full overflow-hidden">
                    {" "}
                    <img
                        className="w-100 h-100 object-cover"
                        src={`https://picsum.photos/200?id=${name}`}
                        alt="profile"
                    />
                </div>
                <div className="pl-4">
                    <h4 className="font-medium">{name}</h4>
                    <p className="text-grey">{designation}</p>
                </div>
            </div>
            <p className="font-medium my-8 tracking-wide">
                {review}
            </p>
        </div>
    );
};

export default TestimonialCard;
