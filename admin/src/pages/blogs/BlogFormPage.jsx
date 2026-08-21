import { useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from "react-toastify";

import { createBlog, getBlogById, updateBlog } from "../../services/blogService.js";
import imageUrl from "../../utils/imageLinkGenerator.js";

function BlogFormPage() {
    const navigate = useNavigate();
    const { id } = useParams();

    const isEditMode = Boolean(id);

    const [formData, setFormData] = useState({
        title: "",
        content: "",
        author: "",
        category: "",
        isPublished: false,
    });

    const [image, setImage] = useState(null);
    const [existingImage, setExistingImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [fetchingBlog, setFetchingBlog] = useState(false);

    useEffect(() => {
        if (isEditMode) {
            fetchBlog();
        }
    }, [id]);

    const fetchBlog = async () => {
        try {
            setFetchingBlog(true);

            const response = await getBlogById(id);
            const blog = response.data;

            setFormData({
                title: blog.title || "",
                content: blog.content || "",
                author: blog.author || "",
                category: blog.category || "",
                isPublished: blog.isPublished || false,
            })

            setExistingImage(blog.image || "");
        } catch (error) {
            console.error(error);

            toast.error(error.response?.data.message || "Failed to fetch blog");
        } finally {
            setFetchingBlog(false);
        }
    }

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        setFormData((prev) => (
            {
                ...prev,
                [name]: type === "checkbox" ? checked : value,
            }
        ));
    }

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);

            const data = new FormData();

            data.append("title", formData.title);
            data.append("content", formData.content);
            data.append("author", formData.author);
            data.append("category", formData.category);
            data.append("isPublished", formData.isPublished);

            if (image) {
                data.append("image", image);
            }

            if (isEditMode) {
                const response = await updateBlog(id, data);

                toast.success("Blog updated successfully");
            } else {
                const response = await createBlog(data);

                toast.success("Blog created successfully");
            }

            navigate("/blogs");
        } catch (error) {
            console.log(error);

            toast.error(error.response?.data.message || `Failed to ${isEditMode ? "update" : "create"} blog`);
        } finally {
            setLoading(false);
        }
    }

    if (fetchingBlog) (
        <div className="min-h-screen flex justify-center items-center">
            <span className="h-20 w-20 rounded-full border-b-2 animate-spin outline-none"></span>
        </div>
    )

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6">{isEditMode ? "Update" : "Create"} Blog</h1>

            <form
                onSubmit={handleSubmit}
                className="max-w-3xl bg-white p-6 rounded-lg space-y-6 shadow"
            >
                {/* Title */}
                <div>
                    <label className="block mb-1 font-medium" >Title</label>

                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="Enter blog title"
                        className="w-full rounded px-3 py-2 border border-gray-300 outline-none focus:ring-2 ring-indigo-300 focus:border-transparent"
                        required
                    />
                </div>

                {/* Author */}
                <div>
                    <label className="block mb-1 font-medium" >Author</label>

                    <input
                        type="text"
                        name="author"
                        value={formData.author}
                        onChange={handleChange}
                        placeholder="Enter your name"
                        className="w-full rounded px-3 py-2 border border-gray-300 outline-none focus:ring-2 ring-indigo-300 focus:border-transparent"
                        required
                    />
                </div>

                {/* Category */}
                <div>
                    <label className="block mb-1 font-medium" >Category</label>

                    <input
                        type="text"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        placeholder="Enter blog'S category"
                        className="w-full rounded px-3 py-2 border border-gray-300 outline-none focus:ring-2 ring-indigo-300 focus:border-transparent"
                    />
                </div>

                {/* Content */}
                <div>
                    <label className="block mb-1 font-medium" >Content</label>

                    <textarea
                        type="text"
                        name="content"
                        placeholder="Enter your blog's content here"
                        value={formData.content}
                        onChange={handleChange}
                        rows="6"
                        className="w-full rounded px-3 py-2 border border-gray-300 outline-none focus:ring-2 ring-indigo-300 focus:border-transparent"
                        required
                    />
                </div>

                {/* Published Status */}
                <div className="flex items-center gap-3">
                    <input
                        type="checkbox"
                        name="isPublished"
                        id="isPublished"
                        checked={formData.isPublished}
                        onChange={handleChange}
                    />

                    <label htmlFor="isPublished" className="font-medium">Publish this blog ?</label>
                </div>

                {/* Existing Image */}
                {isEditMode && existingImage && (
                    <div className="">
                        <p className="mb-2 font-medium">Current Image</p>

                        <div className="w-40 h-24 rounded-lg">
                            <img src={imageUrl(existingImage)} alt={formData.title} className="h-full w-full object-contain" />
                        </div>
                    </div>
                )}

                {/* Image Input */}
                <div className="">
                    <label htmlFor="" className="mb-2 block font-medium">
                        {existingImage ? "Replace Image" : "Upload Image"}
                    </label>

                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="w-full rounded px-3 py-2 border border-gray-300 outline-none focus:ring-2 ring-indigo-300 cursor-pointer focus:border-transparent"
                    />
                </div>

                {/* Submit Button */}
                <div className="flex justify-between items-center">
                    {/* Cancel Button */}
                    <button
                        type="button"
                        onClick={() => navigate(-1)}
                        className="px-3 py-2 rounded-lg border bg-red-600 transition-colors hover:bg-red-700 text-white cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed"
                        disabled={loading}
                    >
                        Cancel
                    </button>

                    {/* Submit Button */}
                    <button
                        onClick={handleSubmit}
                        className="px-3 py-2 rounded-lg botder bg-blue-600 transition-colors hover:bg-blue-700 text-white cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed"
                        disabled={loading}
                    >
                        {isEditMode ? "Update Blog" : "Create Blog"}
                    </button>
                </div>

            </form>
        </div>
    )
}

export default BlogFormPage;