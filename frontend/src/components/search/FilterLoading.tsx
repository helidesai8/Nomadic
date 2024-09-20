// author: Smit Patel
import { Skeleton } from "@mui/material";

export interface FilterItemProps {
    filterName: string;
    filterId: number;
    count: number;
}

interface FilterLoadingProps {
    filterName: string;
    count: number;
}

const FitlerLoading: React.FC<FilterLoadingProps> = (props) => {
    console.log({ props });
    return (
        <>
            <div className="mt-4 font-medium">{props.filterName}</div>
            <ul className="pt-2">
                {
                    Array.from({ length: props.count }, (_, index) => (
                        <li key={index}><Skeleton variant="text" sx={{ fontSize: '1rem' }} /></li>
                    ))
                }
            </ul>
            <div className="mt-3 border-t border-gray-border"></div>
        </>
    );
};

export default FitlerLoading;
