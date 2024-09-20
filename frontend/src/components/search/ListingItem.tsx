// author: Smit Patel
import { Button, Divider, Rating } from "@mui/material";
import NorthEastOutlinedIcon from '@mui/icons-material/NorthEastOutlined';
import { format } from "date-fns";
import { Link } from "react-router-dom";

export interface IListingItem {
    id: number;
    title: string;
    cityName: string;
    categoryName: string;
    duration: number;
    freeCancellation: boolean;
    rating: number;
    reviews: number;
    price: number;
    image: string;
    startDate: string;
    endDate: string;
}

export interface ListingProps {
    listing: IListingItem;
}


const ListingItem = (props: ListingProps) => {
    const {listing} = props;
    return (
        <>
        <div className="flex flex-col my-8 md:flex-row">
            <div className="md:basis-4/12 md:max-w-[250px] md:max-h-[250px]">
                <img
                    className="object-cover w-full h-full rounded-lg bg-gray-border"
                    width={250}
                    height={250}
                    src={listing.image}
                    alt="thumbnail"
                />
            </div>
            <div className="basis-6/12 grow md:px-4 md:pl-8">
                <div>
                    <div className="text-xs text-gray">
                        <span>{listing.duration} {listing.duration === 1 ? "day" : "days"}</span>
                        <span className="mx-3">•</span>
                        <span>{listing.categoryName}</span>
                    </div>
                </div>
                <div className="text-lg font-medium">{listing.title}</div>
                <div className="text-sm text-gray">
                    {listing.cityName}
                </div>
                <div className="text-sm text-gray">
                    Tour begins from <span className="font-bold">{format(listing.startDate, "MMM dd, yyyy")} to {format(listing.endDate, "MMM dd, yyyy")}</span>
                    </div>
                {listing.freeCancellation && <div className="py-6 text-sm font-medium text-success">
                    Free cancellation
                </div>}
            </div>
            <div className="flex flex-col justify-between basis-2/12 md:text-end">
                <div>
                    <Rating size="small" name="read-only" value={listing.rating} readOnly />
                    <div className="text-sm text-gray">{listing.reviews} reviews</div>
                </div>
                <div>
                    <div className="mb-6">
                        <div className="text-sm text-gray">From</div>
                        <div className="text-2xl font-medium">CA${listing.price}</div>
                        <div className="text-sm text-gray">per adult</div>
                    </div>
                    <div>
                        <Button variant="contained" color="primary" component={Link} to={`/tours/${listing.id}`}>
                            {" "}
                            View Detail
                            <span className="ml-2"><NorthEastOutlinedIcon /></span>
                        </Button>
                    </div>
                </div>
            </div>
            
        </div>
        <Divider />
        </>
    );
};

export default ListingItem;
