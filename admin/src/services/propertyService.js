import api from "./api.js";

export const getProperties = async (search = "", propertyType = "", purpose = "", sort = "") => {
    const params = {
        limit: 100,
    };

    if (search) params.search = search;
    if (propertyType) params.propertyType = propertyType;
    if (purpose) params.purpose = purpose;
    if (sort) params.sort = sort;

    const response = await api.get("/properties", {
        params,
    });

    return response.data;
}

export const deleteProperty = async (id) => {
    const response = await api.delete(`/properties/${id}`);

    return response.data;
}

export const createProperty = async (propertyData) => {
    const response = await api.post("/properties", propertyData);

    return response.data;
}

export const getPropertyById = async (id) => {
    const response = await api.get(`/properties/${id}`);

    return response.data;
}

export const updateProperty = async (propertyId, propertyData) => {
    const response = await api.put(`/properties/${propertyId}`, propertyData);

    return response.data;
}