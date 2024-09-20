// author: Smit Patel
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

interface LearningCardProps {
    title: string;
    image: string;
    pretitle: string;
}

const LearningCard = (props: LearningCardProps) => {
    return (
        <div className="relative w-full h-full overflow-hidden rounded-xl">
            <img
                className="absolute h-full w-full object-cover -z-20"
                src={props.image}
                alt={props.title}
            />
            <div className="absolute h-full w-full transition-opacity bg-black top-0 opacity-30 -z-10"></div>
            <div className="full w-full text-white tracking-tight  p-16">
                {props.pretitle && (
                    <div className="font-medium my-6">{props.pretitle}</div>
                )}
                <div className="text-4xl font-bold my-4 mb-10">
                    {props.title}
                </div>
                <Button variant="contained" size="large" component={Link} to="/blogs">
                    <span className="py-1 px-2">Learn More</span>
                </Button>
            </div>
        </div>
    );
};

export default LearningCard;
