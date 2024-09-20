// author: Smit Patel
import { useQuery } from "@tanstack/react-query"
import { getAllLocations } from "../services/locationService";
import { ILocation } from "../interfaces/location.interface";


export const useLocations = () => {
    const locationQuery = useQuery<ILocation[]>({
        queryKey: ["locations"],
        queryFn: async () => {
            try {
                const response = await getAllLocations();
                if(response instanceof Error) {
                    throw new Error(response.message);
                }
                return response;
            }catch (error: any) {
                throw new Error(error);
            };
        }
    });
    return {
        locations: locationQuery.data,
        toursLoading: locationQuery.isLoading,
        toursError: locationQuery.error
    }
}