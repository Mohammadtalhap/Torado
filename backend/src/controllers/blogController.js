import { createBlog, deleteBlog, getAdminBlogs, getAllBlogs, getBlogById, getBlogBySlug, updateBlog } from "../services/blogService.js";

export const createBlogController = async (req, res) => {
    const blogData = {
        ...req.body,
        ...(req.file && {
            image: `/uploads/blogs/${req.file.filename}`
        })
    }

    const newBlog = await createBlog(blogData);

    res.status(201).json({
        success: true,
        message: "Blog created successfully.",
        data: newBlog,
    });
}

export const getAllBlogsController = async (req, res) => {
    const blogs = await getAllBlogs(req.params);

    res.status(200).json({
        success: true,
        message: "Blogs fetched successfully.",
        data: blogs
    });
}

export const getBlogBySlugController = async (req, res) => {
    const { slug } = req.params;

    const blog = await getBlogBySlug(slug);

    res.status(200).json({
        success: true,
        message: "Blog fetched successfully.",
        data: blog,
    });
}

export const getAdminBlogsController = async (req, res) => {
    const blogs = await getAdminBlogs(req.params);

    res.status(200).json({
        success: true,
        message: "All blogs fetched successfully.",
        data: blogs
    });
}

export const getBlogByIdController = async (req, res) => {
    const blog = await getBlogById(req.params.id);

    res.status(200).json({
        success: true,
        message: "Blog fetched successfully.",
        data: blog,
    });
}
export const updateBlogController = async (req, res) => {
    const { id } = req.params;

    const blogData = {
        ...req.body,
        ...(req.file && {
            image: `/uploads/blogs/${req.file.filename}`,
        })
    }

    const updatedBlog = await updateBlog(id, blogData);

    res.status(200).json({
        success: true,
        message: "Blog updated successfully.",
        data: updatedBlog,
    });
}

export const deleteBlogController = async (req, res) => {
    const { id } = req.params;

    const deletedBlog = await deleteBlog(id);

    res.status(200).json({
        success: true,
        message: "Blog deleted successfully.",
        data: deletedBlog,
    });
}