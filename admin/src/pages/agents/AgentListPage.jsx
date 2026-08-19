import { Pencil, Plus, Trash } from 'lucide-react';
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { toast } from "react-toastify";
import { deleteAgent, getAgents } from "../../services/agentService.js";
import imageUrl from "../../utils/imageLinkGenerator.js";

function AgentListPage() {
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAgents = async () => {
    try {
      setLoading(true);

      const response = await getAgents();

      setAgents(response.data);
    } catch (error) {
      console.error(error);
      toast.error(error.response?.message || "Failed to fetch agents");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchAgents();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this agent?");

    if (!confirmDelete) return;

    try {
      await deleteAgent(id);

      toast.success("Agent deleted successfully");

      fetchAgents();
    } catch (error) {
      console.error(error);

      toast.error(error.message || "Failed to delete agent");
    }
  }

  if (loading) (
    <div className="min-h-screen flex justify-center items-center">
      <span className="h-20 w-20 border-b-2 border-gray-900 rounded-full animate-spin"></span>
    </div>
  )

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Agents</h1>
          <p className="text-gray-500 mt-1">Manage your real estate agents</p>
        </div>

        <Link to="/agents/create" className="flex items-center gap-2 px-3 py-2 transition rounded-lg bg-blue-600 hover:bg-blue-700 
        text-white outline-none cursor-pointer">
          <div className="flex items-center jsutify-center">
            <Plus size="18" />
          </div>
          Add Agent
        </Link>
      </div>

      {/* Empty State */}
      {agents.length === 0 ? (
        <div className="bg-white border rounded-lg p-10 text-center">
          <p className="font-medium text-gray-500">No Agents Found</p>
        </div>
      ) : (
        // Agent Table
        <div className="bg-white rounded-lg overflow-hidden">
          <table className="mt-4 space-y-4 min-w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr className="">
                <td className="text-left p-4">Image</td>
                <td className="text-left p-4">Email</td>
                <td className="text-left p-4">Phone</td>
                <td className="text-left p-4">Experience</td>
                <td className="text-left p-4">Specialities</td>
                <td className="text-left p-4">Actions</td>
              </tr>
            </thead>

            <tbody className="">
              {agents.map((agent) => (
                <tr key={agent._id} className="border-b last:border-b-0 border-gray-200">

                  {/* Image Column */}
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      {agent.image ? (
                        <div className="h-16 w-16 rounded-full">

                          <img
                            src={imageUrl(agent.image)}
                            alt={agent.name}
                            className="h-full w-full object-cover rounded-full"
                          />
                        </div>
                      ) : (
                        <div className="h-16 w-16 rounded-full bg-gray-200 flex justify-center items-center">
                          N/A
                        </div>
                      )}

                      <div className="">
                        <p className="font-medium">{agent.name}</p>
                        <p className="text-sm text-gray-500">{agent.designation}</p>
                      </div>
                    </div>
                  </td>

                  {/* Email Column */}
                  <td className="p-4">{agent.email}</td>

                  {/* Phone Column */}
                  <td className="p-4">{agent.phone}</td>

                  {/* Experience Column */}
                  <td className="p-4">{agent.experience} Years</td>

                  {/* Specialities Column */}
                  <td className="p-4">{agent.specialities.join(", ")}</td>

                  {/* Actions Column */}
                  <td className="p-4">
                    <div className="flex gap-2">
                      <Link
                        to={`/agents/edit/${agent._id}`}
                        className="rounded bg-yellow-500 p-2 text-white transition hover:bg-yellow-600 flex justify-center items-center" title="View Agent"
                      >
                        <Pencil size="18" />
                      </Link>
                      <button
                        title="Delete Agent"
                        className="rounded bg-red-600 p-2 text-white cursor-pointer transition hover:bg-red-700 flex justify-center items-center"
                        onClick={() => handleDelete(agent._id)}
                      >
                        <Trash size="18" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default AgentListPage;