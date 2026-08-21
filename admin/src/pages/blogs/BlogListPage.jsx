import { Pencil, Plus, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import { deleteBlog, getAdminBlogs } from "../../services/blogService.js";
import imageUrl from "../../utils/imageLinkGenerator.js";

function BlogListPage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchBlogs = async () => {
    try {
      setLoading(true);

      const response = await getAdminBlogs();

      setBlogs([...response.data] || []);
    } catch (error) {
      console.error(error);

      toast.error(error.message || "Failed to fetch blogs");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this blog?");

    if (!confirmDelete) return;

    try {
      await deleteBlog(id);

      toast.success("Blog deleted successfully");

      fetchBlogs();
    } catch (error) {
      console.log(error.response);

      toast.error(error.response?.data.message || "Failed to delete blog");
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <span className="h-20 w-20 rounded-full border-b-2 border-gray-900 animate-spin"></span>
      </div>
    )
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-bold">Blogs</h1>
          <p className="text-gray-500">Manage your blogs</p>
        </div>

        <Link to="/blogs/create" className="flex items-center gap-1 px-3 py-2 bg-blue-600 text-white rounded-lg transition-colors hover:bg-blue-700 ouline-none cursor-pointer">
          <Plus size="18" />
          Create Blog
        </Link>
      </div>

      <div className="bg-white rounded-lg overflow-hidden">
        {blogs.length === 0 ? (
          // Empty State
          <div className="p-10 text-center">
            <p className="font-medium text-gray-500">No blogs found</p>
          </div>
        ) : (
          // Table
          <table className="mt-4 space-y-4 min-w-full table-fixed">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr className="">
                <td className="text-left p-4">Image</td>
                <td className="text-left p-4">Title</td>
                <td className="text-left p-4">Content</td>
                <td className="text-left p-4">Author</td>
                <td className="text-left p-4">Category</td>
                <td className="text-left p-4">Status</td>
                <td className="text-left p-4">Actions</td>
              </tr>
            </thead>

            <tbody className="">
              {blogs.map((blog) => (
                <tr key={blog._id} className="border-b last:border-b-0 border-gray-200">

                  {/* Image */}
                  <td className="p-4">
                    <div className="h-24 w-36 bg-gray-200 rounded">
                      {blog.image ? (
                        <img src={imageUrl(blog.image)} alt={blog.title} className="h-full w-full object-contain" />
                      ) : (
                        <p className="h-full w-full flex justify-center items-center text-lg">N/A</p>
                      )}
                    </div>
                  </td>

                  {/* Title */}
                  <td className="p-4 max-w-40">{blog.title}</td>

                  {/* Content */}
                  <td className="p-4">
                    <div className="line-clamp-3 whitespace-normal max-w-40" title={blog.content}>
                      {blog.content}
                    </div>
                  </td>

                  {/* Author */}
                  <td className="p-4 max-w-40">{blog.author}</td>

                  {/* Category */}
                  <td className="p-4">{blog.category}</td>

                  {/* Status */}
                  <td className="p-4 text-sm">{blog.isPublished ? "Published" : "Draft"}</td>

                  {/* Actions */}
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <Link
                        to={`/blogs/edit/${blog._id}`}
                        className="p-2 bg-yellow-500 transition-colors hover:bg-yellow-600 rounded flex justify-center items-center text-white"
                      >
                        <Pencil size="18" />

                      </Link>

                      <button
                        onClick={() => handleDelete(blog._id)}
                        className="p-2 bg-red-600 transition-colors hover:bg-red-700 rounded flex justify-center items-center text-white cursor-pointer"
                      >
                        <Trash size="18" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default BlogListPage;
