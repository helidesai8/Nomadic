// author: Smit Patel
import { TourList } from "../interfaces/tour.interface";

export const getTours = async ({
  categories,
  city,
  freeCancelationAvailable,
  minPrice,
  maxPrice,
  sortBy,
  sortOrder,
  page,
  startDate,
  endDate,
  minDuration,
  maxDuration,
  pageSize,
}: {
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
}) => {
  try {
    let query = categories ? `?categories=${categories}` : '';
    query += city ? `${query ? '&' : '?'}city=${city}` : '';
    query += freeCancelationAvailable ? `${query ? '&' : '?'}freeCancelationAvailable=${freeCancelationAvailable}` : '';
    query += minPrice ? `${query ? '&' : '?'}minPrice=${minPrice}` : '';
    query += maxPrice ? `${query ? '&' : '?'}maxPrice=${maxPrice}` : '';
    query += sortBy ? `${query ? '&' : '?'}sortBy=${sortBy}` : '';
    query += sortOrder ? `${query ? '&' : '?'}sortOrder=${sortOrder}` : '';
    query += page ? `${query ? '&' : '?'}page=${page}` : '';
    query += startDate ? `${query ? '&' : '?'}startDate=${startDate}` : '';
    query += endDate ? `${query ? '&' : '?'}endDate=${endDate}` : '';
    query += minDuration ? `${query ? '&' : '?'}minDuration=${minDuration}` : '';
    query += maxDuration ? `${query ? '&' : '?'}maxDuration=${maxDuration}` : '';
    query += pageSize ? `${query ? '&' : '?'}pageSize=${pageSize}` : '';
    const response = await fetch(`/api/v1/tours${query}`);
    if (!response.ok) {
      throw new Error('Failed to fetch');
    }
    const data: TourList = await response.json();
    return data;
  } catch (error: any) {
    return new Error(error.error);
  }
}