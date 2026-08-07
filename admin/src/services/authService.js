import api from './api.js';

export const loginAdmin = async (loginData) => {
    const response = await api.post("/admin/login", loginData);
    return response.data;
};

export const getAdminProfile = async () => {
    const response = await api.get("/admin/profile");
    return response.data;
}