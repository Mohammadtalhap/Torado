import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        slug: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        content: {
            type: String,
            required: true,
            trim: true,
        },
        author: {
            type: String,
            required: true,
            trim: true,
        },
        category: {
            type: String,
            required: true,
            trim: true,
        },
        image: {
            type: String,
            default: "",
        },
        isPublished: {
            type: Boolean,
            default: false,
        },
    },
    {
        timeStamps: true,
    }
);

const Blog = mongoose.model("Blog", blogSchema);

export default Blog;