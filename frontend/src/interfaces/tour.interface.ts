// author: Smit Patel
export interface Tour {
    id: number;
    name: string;
    location: string;
    city: string;
    price: number;
    image: string;
    freeCancelationAvailable: boolean;
    tourCategoryId: number;
    createdAt: string;
    updatedAt: string;
    startDate: string;
    endDate: string;
    duration: number;
    averageRating: number;
    totalReviews: number;
}

export interface TourMetaData {
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
    freeCancelationAvailableCount: number;
    minPrice: number;
    maxPrice: number;
}

export interface TourList {
    data: Tour[];
    meta: TourMetaData;
}