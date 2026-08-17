import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { deleteProperty, getProperties } from "../../services/propertyService.js";

function PropertyListPage() {
  const navigate = useNavigate();

  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [purpose, setPurpose] = useState("");
  const [sort, setSort] = useState("");

  const imageUrl = (image) => {
    return `http://localhost:5000${image}`;
  };

  useEffect(() => {
    const fetchedProperties = async () => {
      try {
        setLoading(true);
        setProperties([]);

        const response = await getProperties(search, propertyType, purpose, sort);

        setProperties(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchedProperties();
  }, [search, propertyType, purpose, sort]);

  const handleDelete = async (id) => {
    try {
      await deleteProperty(id);

      setProperties(
        properties.filter((property) => property._id !== id)
      );

      toast.success("Property deleted successfully!");
    } catch (error) {
      console.error(error);

      toast.error(error.response?.message || "Failed to delete property");
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="h-20 w-20 animate-spin border-b-2 rounded-full border-gray-900"></span>
      </div>
    )
  }

  if (properties.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <h2 className="text-xl font-semibold text-gray-700">
          No properties found
        </h2>

        <p className="mt-2 text-gray-500">There are no properties available yet</p>
      </div>
    )
  }

  return (
    <div>
      {/* Top Layer */}
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Properties</h1>

        <span onClick={() => navigate("/properties/create")} className="rounded-md bg-blue-600 px-4 py-2 text-white cursor-pointer transition-colors hover:bg-blue-700">
          Add Property
        </span>
      </div>

      {/* Main Box */}
      <div className="overflow-x-auto rounded-lg bg-white shadow">

        {/* Filtering Layer */}
        <div className="p-4">
          <div className="w-full flex items-center gap-3">
            <input
              type="text"
              placeholder="Search by title"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded border border-gray-300 px-3 py-2"
            />
            {/* Property Type */}
            <div className="relative">
              <select
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value)}
                className="appearance-none rounded-lg border px-3 py-2 pr-10 outline-none"
              >
                <option value="">Property Type</option>
                <option value="Residential">Residential</option>
                <option value="Commercial">Commercial</option>
                <option value="Apartment">Apartment</option>
              </select>

              <ChevronDown
                size={18}
                strokeWidth={2}
                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              />
            </div>
            {/* Purpose */}
            <div className="relative">
              <select
                value={purpose}
                onChange={(e) => setPurpose(e.target.value)}
                className="appearance-none rounded-lg border px-3 py-2 pr-10 outline-none"
              >
                <option value="">Purpose</option>
                <option value="Sale">Sale</option>
                <option value="Rent">Rent</option>
              </select>

              <ChevronDown
                size={18}
                strokeWidth={2}
                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              />
            </div>
            {/* Sort */}
            <div className="relative">
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="appearance-none rounded-lg border px-3 py-2 pr-10 outline-none"
              >
                <option value="">Sort By</option>
                <option value="-createdAt">Newest</option>
                <option value="createdAt">Oldest</option>
                <option value="price">Price: Low to High</option>
                <option value="-price">Price: High to Low</option>
              </select>

              <ChevronDown
                size={18}
                strokeWidth={2}
                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              />
            </div>

          </div>
        </div>
        {/* Table */}
        <table className="min-w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-4 py-3 text-left">Image</th>
              <th className="px-4 py-3 text-left">Title</th>
              <th className="px-4 py-3 text-left">Price</th>
              <th className="px-4 py-3 text-left">Property Type</th>
              <th className="px-4 py-3 text-left">Purpose</th>
              <th className="px-4 py-3 text-left">Actions</th>
            </tr>
          </thead>

          <tbody className="">
            {properties.map((property) => {
              return (
                <tr key={property._id} className="border-b last:border-b-0 border-gray-200">
                  <td className="px-4 py-4">
                    <div className="h-16 w-24 rounded bg-gray-200">
                      <img
                        src={imageUrl(property.images[0])}
                        alt={property.title}
                        className="h-full w-full object-contain"
                      />
                    </div>
                  </td>

                  <td className="px-4 py-4">{property.title}</td>

                  <td className="px-4 py-4">${property.price}</td>

                  <td className="px-4 py-4">{property.propertyType}</td>

                  <td className="px-4 py-4">{property.purpose}</td>

                  <td className="space-x-2 px-4 py-4">
                    <button onClick={() => navigate(`/properties/edit/${property._id}`)} className="rounded bg-yellow-500 px-3 py-1 text-white cursor-pointer transition hover:bg-yellow-600">
                      Edit
                    </button>

                    <button
                      onClick={() => {
                        if (window.confirm("Are you sure you want to delete this property?")) {
                          handleDelete(property._id);
                        }
                      }}
                      className="rounded bg-red-600 px-3 py-1 text-white cursor-pointer transition hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PropertyListPage;
