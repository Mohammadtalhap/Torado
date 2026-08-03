import slugify from "slugify";
import Blog from "../models/blogModel.js";
import ApiError from "../utils/apiError.js";
import ApiFeatures from "../utils/apiFeatures.js";

/*===================================
            Helper Functions
==================================== */

const findBlogById = async (id) => {
    const blog = await Blog.findById(id);

    if (!blog) {
        throw new ApiError(404, "Blog not found.");
    }

    return blog;
}

const generateSlug = (title) => {
    return slugify(title, {
        lower: true,
        strict: true,
        trim: true,
    });
};

const checkDuplicateSlug = async (slug, excludeBlogId = null) => {
    const existingBlog = await Blog.findOne({ slug });

    if (
        existingBlog &&
        (!excludeBlogId ||
            existingBlog._id.toString() !== excludeBlogId.toString()
        )
    ) {
        throw new ApiError(400, "Blog with this title already exists.");
    }
};

const addSlugInData = (blogData) => {
    return {
        ...blogData,
        slug: generateSlug(blogData.title),
    }
};


/*===================================
            Service Functions
==================================== */

export const createBlog = async (blogData) => {
    const newBlog = addSlugInData(blogData);

    await checkDuplicateSlug(newBlog.slug);

    return await Blog.create(newBlog);
};

export const getAllBlogs = async (queryParams) => {
    let query = Blog.find({ isPublished: true });

    const apiFeatures = new ApiFeatures(query, queryParams);

    apiFeatures
        .search([
            "title",
            "content",
            "author",
            "category"
        ])
        .sort()
        .paginate();

    return await apiFeatures.query;
}

export const getBlogBySlug = async (slug) => {
    const blog = await Blog.findOne({ slug, isPublished: true });

    if (!blog) {
        throw new ApiError(404, "Blog not Found.");
    }

    return blog;
}

export const getAdminBlogs = async (queryParams) => {
    let query = Blog.find();

    const apiFeatures = new ApiFeatures(query, queryParams);

    apiFeatures
        .search([
            "title",
            "content",
            "author",
            "category"
        ])
        .sort()
        .paginate();

    return await apiFeatures.query;
}

export const getBlogById = async (id) => {
    return await findBlogById(id);
}

export const updateBlog = async (id, newBlogData) => {
    const existingBlog = await findBlogById(id);

    if (newBlogData.title) {
        const newSlug = generateSlug(newBlogData.title);

        await checkDuplicateSlug(newSlug, existingBlog._id);

        newBlogData = {
            ...newBlogData,
            slug: newSlug,
        };
    }

    Object.assign(existingBlog, newBlogData);

    await existingBlog.save();

    return existingBlog;
}

export const deleteBlog = async (id) => {
    const blog = await findBlogById(id);

    await blog.deleteOne();

    return blog;
}