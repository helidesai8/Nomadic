// author: Smit Patel
export interface TourCategory {
    id: number;
    name: string;
    tourPackageCount: number;
    createdAt: string;
    updatedAt: string;
}

export interface TourCategoryList {
    data: TourCategory[];
}