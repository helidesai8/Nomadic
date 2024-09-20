// author: Smit Patel
import { useQuery } from "@tanstack/react-query";
import { getTours } from "../services/tourService";
import { TourList } from "../interfaces/tour.interface";

interface UseTours {
    categories: string | null;
    city: string | null;
    freeCancelationAvailable: string | null;
    minPrice: string | null;
    maxPrice: string | null;
    sortBy: string | null;
    sortOrder: string | null;
    page: string | null;
    startDate: string | null;
    endDate: string | null;
    minDuration: string | null;
    maxDuration: string | null;
    pageSize: string | null;
}

export const useTours = (props: UseTours) => {
    const tourQuery = useQuery<TourList>({
        queryKey: [
            "tours",
            props.categories,
            props.city,
            props.freeCancelationAvailable,
            props.minPrice,
            props.maxPrice,
            props.sortBy,
            props.sortOrder,
            props.page,
            props.startDate,
            props.endDate,
            props.minDuration,
            props.maxDuration,
            props.pageSize,
        ],
        queryFn: async () => {
            try {
                const response = await getTours({
                    categories: props.categories,
                    city: props.city,
                    freeCancelationAvailable: props.freeCancelationAvailable,
                    minPrice: props.minPrice,
                    maxPrice: props.maxPrice,
                    sortBy: props.sortBy,
                    sortOrder: props.sortOrder,
                    page: props.page,
                    startDate: props.startDate,
                    endDate: props.endDate,
                    minDuration: props.minDuration,
                    maxDuration: props.maxDuration,
                    pageSize: props.pageSize,
                });
                if (response instanceof Error) {
                    throw new Error(response.message);
                }
                return response;
            } catch (error: any) {
                throw new Error(error);
            }
        },
    });
    return {
        tours: tourQuery.data,
        toursLoading: tourQuery.isLoading,
        toursError: tourQuery.error,
    };
};
