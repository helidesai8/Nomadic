// author: Smit Patel
export const getAllLocations = async () => {
    try {
        const response = await fetch(`/api/v1/locations`);
        const data = await response.json();
        return data;
    } catch (error) {
        return error;
    }
}