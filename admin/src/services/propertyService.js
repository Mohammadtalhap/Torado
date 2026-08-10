import api from "./api.js";

export const getProperties = async () => {
    const response = await api.get("/properties?limit=100");

    return response.data;
}

export const deleteProperty = async (id) => {
    const response = await api.delete(`/properties/${id}`);

    return response.data;
}