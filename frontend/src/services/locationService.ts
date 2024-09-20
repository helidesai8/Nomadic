// author: Smit Patel
export const getAllLocations = async () => {
    try {
        const response = await fetch(`${import.meta.env.VITE_BASE_API_URL}/api/v1/locations`);
        const data = await response.json();
        return data;
    } catch (error) {
        return error;
    }
}