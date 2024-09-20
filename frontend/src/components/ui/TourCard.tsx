// author: Smit Patel
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

interface TourCardProps {
    name: string;
    location: string;
    city: string;
    rating: number;
    reviews: number;
    price: number;
    image: string;
    tourId: number;
}
const TourCard = (props: TourCardProps) => {
    return (
        <div className="w-full mx-auto rounded-lg max-w-80">
            <div className="w-full overflow-hidden rounded-lg h-80">
                <img
                    className="object-cover w-full h-full"
                    src={props.image}
                    alt={props.name}
                />
            </div>
            <h4 className="my-2 text-xl font-medium tracking-tighter">
                {props.name}
            </h4>
            <p className="mb-4 text-sm text-grey">{props.location}, {props.city}</p>
            <div className="flex items-center">
                <div className="flex items-center justify-center w-8 h-8 font-bold text-white rounded-md bg-primary">
                    {props.rating}
                </div>
                <div className="ml-2 text-sm font-medium tracking-tighter">
                    Exceptional
                </div>
                <div className="ml-4 text-sm text-grey">
                    {props.reviews} reviews
                </div>
            </div>
            <div className="my-2 font-medium tracking-tight">
                Starting from{" "}
                <span className="font-bold text-primary">CA${props.price}</span>
            </div>
            <Button
                component={Link}
                to={`/tours/${props.tourId}`}
                variant="contained"
                className="w-full"
            >Explore</Button>
        </div>
    );
};

export default TourCard;
