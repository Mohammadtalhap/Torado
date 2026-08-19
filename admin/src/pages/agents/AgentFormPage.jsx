import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { createAgent, getAgentById, updateAgent } from "../../services/agentService.js";

function AgentFormPage() {
    const navigate = useNavigate();
    const { id } = useParams();

    const isEditMode = Boolean(id);

    const [formData, setFormData] = useState({
        name: "",
        designation: "",
        email: "",
        phone: "",
        bio: "",
        experience: "",
        specialities: "",
    });

    const [image, setImage] = useState(null);
    const [existingImage, setExistingImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [fetchingAgent, setFetchingAgent] = useState(false);

    useEffect(() => {
        if (!id) return;

        const fetchAgent = async () => {
            try {
                setFetchingAgent(true);

                const response = await getAgentById(id);
                const agent = response.data;

                setFormData({
                    name: agent.name || "",
                    designation: agent.designation || "",
                    email: agent.email || "",
                    phone: agent.phone || "",
                    bio: agent.bio || "",
                    experience: agent.experience || "",
                    specialities: agent.specialities?.join(", ") || "",
                });

                setExistingImage(agent.image || "");
            } catch (error) {
                console.log(error);

                toast.error(error.message || "Failed to fetch agent");
            } finally {
                setFetchingAgent(false);
            }
        }

        fetchAgent();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => (
            {
                ...prev,
                [name]: value
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

            data.append("name", formData.name);
            data.append("designation", formData.designation);
            data.append("email", formData.email);
            data.append("phone", formData.phone);
            data.append("bio", formData.bio);
            data.append("experience", formData.experience);

            // convert comma separated specialities into an array 
            const specialitiesArray = formData.specialities
                .split(",")
                .map((speciality) => speciality.trim())
                .filter((speciality) => speciality !== "");

            specialitiesArray.forEach((speciality) => {
                data.append("specialities", speciality);
            });

            if (image) {
                data.append("image", image);
            }

            if (isEditMode) {
                await updateAgent(id, data);

                toast.success("Agent updated successfully");
            } else {
                await createAgent(data);

                toast.success("Agent created successfully");
            }

            navigate("/agents");
        } catch (error) {
            console.log(error);

            toast.error(error.message || `Failed to ${isEditMode ? "update" : "create"} agent`);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div>
            <h1 className="mb-6 font-bold text-3xl">{isEditMode ? "Update" : "Create"} Agent</h1>

            <form
                onSubmit={handleSubmit}
                className="max-w-3xl space-y-6 rounded-lg bg-white p-6 shadow"
            >
                {/* Name */}
                <div>
                    <label className="block mb-1 font-medium">Name</label>
                    <input
                        type="text"
                        name="name"
                        placeholder="Enter agent name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full rounded border px-3 py-2 outline-none ring-indigo-300 focus:border-indigo-300 focus:ring-2"
                    />
                </div>

                {/* Designation */}
                <div>
                    <label className="block mb-1 font-medium">Designation</label>
                    <input
                        type="text"
                        name="designation"
                        placeholder="Enter agent's destination"
                        value={formData.designation}
                        onChange={handleChange}
                        className="w-full rounded border px-3 py-2 outline-none ring-indigo-300 focus:border-indigo-300 focus:ring-2"
                    />
                </div>

                {/* Email */}
                <div>
                    <label className="block mb-1 font-medium">Email</label>
                    <input
                        type="email"
                        name="email"
                        placeholder="Enter agent's email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full rounded border px-3 py-2 outline-none ring-indigo-300 focus:border-indigo-300 focus:ring-2"
                    />
                </div>

                {/* Phone */}
                <div>
                    <label className="block mb-1 font-medium">Phone</label>
                    <input
                        type="text"
                        name="phone"
                        placeholder="Enter agent's phone number"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full rounded border px-3 py-2 outline-none ring-indigo-300 focus:border-indigo-300 focus:ring-2"
                    />
                </div>

                {/* Bio */}
                <div>
                    <label className="block mb-1 font-medium">Bio</label>
                    <input
                        type="bio"
                        name="bio"
                        placeholder="Enter agent's bio"
                        value={formData.bio}
                        onChange={handleChange}
                        className="w-full rounded border px-3 py-2 outline-none ring-indigo-300 focus:border-indigo-300 focus:ring-2"
                    />
                </div>

                {/* Experience */}
                <div>
                    <label className="block mb-1 font-medium">Experience</label>
                    <input
                        type="number"
                        name="experience"
                        placeholder="Enter agent's experience in years"
                        value={formData.experience}
                        onChange={handleChange}
                        className="w-full rounded border px-3 py-2 outline-none ring-indigo-300 focus:border-indigo-300 focus:ring-2"
                    />
                </div>

                {/* Specialities */}
                <div>
                    <label className="block mb-1 font-medium">Specialities</label>
                    <input
                        type="String"
                        name="specialities"
                        placeholder="Enter agent's specialities (comma separated)"
                        value={formData.specialities}
                        onChange={handleChange}
                        className="w-full rounded border px-3 py-2 outline-none ring-indigo-300 focus:border-indigo-300 focus:ring-2"
                    />
                </div>

                {/* Image */}
                <div>
                    <label className="block mb-1 font-medium">Image</label>
                    <input
                        type="file"
                        accept="image/*"
                        name="image"
                        onChange={handleImageChange}
                        className="w-full rounded border px-3 py-2 outline-none ring-indigo-300 focus:border-indigo-300 focus:ring-2"
                    />
                </div>

                {/* Buttons */}
                <div className="flex justify-between gap-5">
                    <button
                        type="button"
                        onClick={() => navigate(-1)}
                        className="px-3 py-2 rounded-lg text-white bg-red-600 transition-colors hover:bg-red-700 cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed"
                        disabled={loading}
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="px-3 py-2 rounded-lg text-white bg-blue-600 transition-colors hover:bg-blue-700 cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed"
                        disabled={loading}
                    >
                        {isEditMode ? "Update" : "Create"}
                    </button>
                </div>
            </form>

        </div>
    )
}

export default AgentFormPage;