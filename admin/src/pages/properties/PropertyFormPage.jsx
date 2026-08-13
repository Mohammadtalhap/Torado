import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { createProperty, getPropertyById, updateProperty } from "../../services/propertyService";

function PropertyFormPage() {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        price: 0,
        address: "",
        propertyType: "",
        purpose: "",
        bedrooms: 0,
        bathrooms: 0,
        garages: 0,
        sqft: 0,
    });
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const { id } = useParams();
    const navigate = useNavigate();

    const isEditMode = Boolean(id);

    useEffect(() => {
        if (!id) return;

        const fetchProperty = async () => {
            try {
                setLoading(true);
                const response = await getPropertyById(id);

                setFormData(response.data);
            } catch (error) {
                console.error(error);
                toast.error(error.response?.message || "Failed to fetch property");
            } finally {
                setLoading(false);
            }
        };

        fetchProperty();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            const data = new FormData();

            Object.entries(formData).forEach(([key, value]) => {
                if (key !== "images") {
                    data.append(key, value);
                }
            });

            for (const image of images) {
                data.append("images", image);
            }

            if (isEditMode) {
                await updateProperty(id, data);

                toast.success("Property updated successfully!");
            } else {
                await createProperty(data);

                toast.success("Property created successfully!");
            }

            navigate("/properties");
        } catch (error) {
            console.log("ERROR:", error);
            console.log(
                "ERROR RESPONSE:",
                JSON.stringify(error.response?.data, null, 2)
            );
            setError(error);

            toast.error(error.response?.message || `Failed to ${isEditMode ? "update" : "create"} property`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h1 className="mb-6 text-3xl font-bold">{isEditMode ? "Edit Property" : "Create Property"}</h1>

            <form
                onSubmit={handleSubmit}
                className="max-w-3xl space-y-6 rounded-lg bg-white p-6 shadow">

                {/* Title */}
                <div>
                    <label className="mb-1 block font-medium">Title</label>
                    <input
                        type="text"
                        name="title"
                        placeholder="Enter property title"
                        value={formData.title}
                        onChange={handleChange}
                        className="w-full rounded border px-3 py-2 outline-none ring-indigo-300 focus:border-indigo-300 focus:ring-2"
                        required
                    />
                </div>

                {/* Description */}
                <div>
                    <label className="mb-1 block font-medium">Description</label>
                    <textarea
                        name="description"
                        placeholder="Enter property description"
                        value={formData.description}
                        onChange={handleChange}
                        className="w-full rounded border px-3 py-2 outline-none ring-indigo-300 focus:border-indigo-300 focus:ring-2"
                        rows="5"
                        required
                    />
                </div>


                {/* Address */}
                <div>
                    <label className="mb-1 block font-medium">Address</label>
                    <input
                        type="text"
                        name="address"
                        placeholder="Enter address of the property"
                        value={formData.address}
                        onChange={handleChange}
                        className="w-full rounded border px-3 py-2 outline-none ring-indigo-300 focus:ring-2 focus:border-indigo-300"
                        required
                    />
                </div>

                {/* Price & Selectors - Special values */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">

                    <div>
                        <label className="mb-1 block font-medium">Price</label>
                        <input
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            className="w-full rounded border px-3 py-2 outline-none ring-indigo-300 focus:ring-2 focus:border-indigo-300"
                            required
                        />
                    </div>

                    <div>
                        <label className="mb-1 block font-medium">Property Type</label>
                        <div className="relative">
                            <select
                                id="propertyType"
                                name="propertyType"
                                value={formData.propertyType}
                                onChange={handleChange}
                                className="appearance-none w-full rounded-lg border px-3 py-2 pr-10 outline-none"
                                required
                            >
                                <option value="">Select type</option>
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
                    </div>

                    <div>
                        <label className="mb-1 block font-medium">Purpose</label>
                        <div className="relative">
                            <select
                                id="purpose"
                                name="purpose"
                                value={formData.purpose}
                                onChange={handleChange}
                                className="appearance-none w-full rounded-lg border px-3 py-2 pr-10 outline-none"
                                required
                            >
                                <option value="">Select purpose</option>
                                <option value="Sale">Sale</option>
                                <option value="Rent">Rent</option>
                            </select>

                            <ChevronDown
                                size={18}
                                strokeWidth={2}
                                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                            />
                        </div>
                    </div>
                </div>

                {/* Details about Rooms - Number */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">

                    <div className="">
                        <label className="mb-1 block font-medium">Bedrooms</label>
                        <input
                            type="number"
                            name="bedrooms"
                            value={formData.bedrooms}
                            onChange={handleChange}
                            className="w-full rounded border px-3 py-2 outline-none ring-indigo-300 focus:ring-2 focus:border-indigo-300"
                            required
                        />
                    </div>

                    <div>
                        <label className="mb-1 block font-medium">Bathrooms</label>
                        <input
                            type="number"
                            name="bathrooms"
                            value={formData.bathrooms}
                            onChange={handleChange}
                            className="w-full rounded border px-3 py-2 outline-none ring-indigo-300 focus:ring-2 focus:border-indigo-300"
                            required
                        />
                    </div>

                    <div>
                        <label className="mb-1 block font-medium">Garages</label>
                        <input
                            type="number"
                            name="garages"
                            value={formData.garages}
                            onChange={handleChange}
                            className="w-full rounded border px-3 py-2 outline-none ring-indigo-300 focus:ring-2 focus:border-indigo-300"
                            required
                        />
                    </div>

                    <div>
                        <label className="mb-1 block font-medium">Square Feet</label>
                        <input
                            type="number"
                            name="sqft"
                            value={formData.sqft}
                            onChange={handleChange}
                            className="w-full rounded border px-3 py-2 outline-none ring-indigo-300 focus:ring-2 focus:border-indigo-300"
                            required
                        />
                    </div>
                </div>

                {/* Images */}
                <div className="">
                    <label className="mb-1 block font-medium">Property Images</label>
                    <input
                        type="file"
                        name="images"
                        accept="image/*"
                        multiple
                        onChange={(e) => {
                            setImages((prevImages) => [
                                ...prevImages,
                                ...Array.from(e.target.files),
                            ]);
                        }}
                        className="w-full rounded border px-3 py-2 cursor-pointer"
                    />
                    {images.length > 0 && (
                        <div className="mt-3">
                            <p className="mb-2 text-sm font-medium">
                                Selected Images: {images.length}
                            </p>

                            <div className="space-y-1">
                                {images.map((image, index) => (
                                    <p key={index} className="text-sm text-gray-600">
                                        {image.name}
                                    </p>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Buttons */}
                <div className="flex justify-between gap-5">

                    <button onClick={() => navigate(-1)} className="px-3 py-2 rounded-lg text-white bg-red-600 transition hover:bg-red-700 cursor-pointer">
                        Cancel
                    </button>

                    <button className="px-3 py-2 rounded-lg text-white bg-blue-600 transition hover:bg-blue-700 cursor-pointer">
                        {isEditMode ? "Update Property" : "Create Property"}
                    </button>

                </div>

            </form>
        </div>
    )
}

export default PropertyFormPage;