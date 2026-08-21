import api from "./api";

export const getAdminBlogs = async () => {
    const response = await api.get("/blogs/admin");

    return response.data;
}

export const getBlogById = async (id) => {
    const response = await api.get(`/blogs/admin/${id}`);

    return response.data;
}

export const createBlog = async (blogData) => {
    const response = await api.post("/blogs", blogData);

    return response.data;
}

export const updateBlog = async (id, blogData) => {
    const response = await api.put(`/blogs/${id}`, blogData);

    return response.data;
}

export const deleteBlog = async (id) => {
    const response = await api.delete(`/blogs/${id}`);

    return response.data;
}
