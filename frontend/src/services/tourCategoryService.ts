// author: Smit Patel
export const getAllTourCategories = async ({
    city,
    startDate,
    endDate
}: {
    city: string | null;
    startDate: string | null;
    endDate: string | null;
}) => {
    try {
        let query = city ? `?city=${city}` : '';
        query += startDate ? `&startDate=${startDate}` : '';
        query += endDate ? `&endDate=${endDate}` : '';
        const response = await fetch(`${import.meta.env.VITE_BASE_API_URL}/api/v1/tour-categories${query}`);
        if (!response.ok) {
            throw new Error('Failed to fetch');
        }
        const data = await response.json();
        return data;
    } catch (error: any) {
        return new Error(error.error);
    }
}