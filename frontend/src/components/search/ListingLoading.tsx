// author: Smit Patel
import { Button, Divider, Rating, Skeleton } from "@mui/material";
import NorthEastOutlinedIcon from '@mui/icons-material/NorthEastOutlined';


export interface ListingProps {
}


const ListingLoadingItem = (props: ListingProps) => {
    return (
        <>
        <div className="flex my-8 flex-col md:flex-row">
            <div className="md:basis-4/12 md:max-w-[250px] md:max-h-[250px]">
                <Skeleton variant="rounded" width={250} height={250} />
            </div>
            <div className="basis-6/12 grow md:px-4 md:pl-8">
                <div>
                    <div className="text-xs text-gray">
                        <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                    </div>
                </div>
                <div className="font-medium text-lg"><Skeleton variant="text" /></div>
                <div className="text-sm text-gray">
                <Skeleton variant="text" />
                </div>
                <div className="text-sm text-gray">
                <Skeleton variant="text" />
                </div>
            </div>
            <div className="basis-2/12 md:text-end flex flex-col justify-between">
                <div>
                    <Rating size="small" name="read-only" value={0} readOnly />
                    <div className="text-sm text-gray"><Skeleton variant="text" /></div>
                </div>
                <div>
                    <div className="mb-6">
                        <Skeleton variant="text" />
                    </div>
                    <div>
                        <Button variant="contained" color="primary" disabled>
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

const ListingLoading = () => {
    return (
        <>
            <ListingLoadingItem />
            <ListingLoadingItem />
            <ListingLoadingItem />
            <ListingLoadingItem />
            <ListingLoadingItem />
        </>
    );
}

export default ListingLoading;
