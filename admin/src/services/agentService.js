import api from "./api";

// Get All Agents
export const getAgents = async () => {
    const response = await api.get("/agents");

    return response.data;
};

// Get a single agent
export const getAgentById = async (id) => {
    const response = await api.get(`/agents/${id}`);

    return response.data;
}

// Create Agent
export const createAgent = async (agentData) => {
    const response = await api.post("/agents", agentData);

    return response.data;
};

// Update/Edit Agent
export const updateAgent = async (id, agentData) => {
    const response = await api.put(`/agents/${id}`, agentData);

    return response.data;
};

export const deleteAgent = async (id) => {
    const response = await api.delete(`/agents/${id}`);

    return response.data;
}