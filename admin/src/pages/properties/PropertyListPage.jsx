import { useEffect, useState } from "react";
import { deleteProperty, getProperties } from "../../services/propertyService.js";

function PropertyListPage() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  const imageUrl = (image) => {
    return `http://localhost:5000${image}`;
  };

  useEffect(() => {
    const fetchedProperties = async () => {
      try {
        const response = await getProperties();

        setProperties(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchedProperties();
  });

  const handleDelete = async (id) => {
    try {
      await deleteProperty(id);

      setProperties(
        properties.filter((property) => property._id !== id)
      );
    } catch (error) {
      console.error(error);
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

        <button className="rounded-md bg-blue-600 px-4 py-2 text-white cursor-pointer transition-colors hover:bg-blue-700">
          Add Property
        </button>
      </div>

      {/* Main Box */}
      <div className="overflow-x-auto rounded-lg bg-white shadow">

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
                <tr key={property._id}>
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
                    <button className="rounded bg-green-600 px-3 py-1 text-white cursor-pointer transition hover:bg-green-700">
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
