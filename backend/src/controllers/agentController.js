import { createAgent, deleteAgent, getAgentById, getAllAgents, updateAgent } from "../services/agentService.js";

export const createAgentController = async (req, res) => {
    const agentData = {
        ...req.body,
        image: req.file
            ? `/uploads/agents/${req.file.filename}`
            : undefined
    };

    const agent = await createAgent(agentData);

    res.status(201).json({
        success: true,
        message: "Agent created successfully!",
        data: agent
    });
}

export const getAllAgentsController = async (req, res) => {
    const agents = await getAllAgents();

    res.status(200).json({
        success: true,
        message: "Agents fetched successfully!",
        data: agents,
    });
}

export const getAgentByIdController = async (req, res) => {
    const agent = await getAgentById(req.params.id);

    res.status(200).json({
        success: true,
        message: "Agent fetched successfully!",
        data: agent
    });
}

export const updateAgentController = async (req, res) => {
    const agentData = {
        ...req.body,
    };

    if (req.file) {
        agentData.image = `/uploads/agents/${req.file.filename}`;
    }

    const updatedAgent = await updateAgent(req.params.id, agentData);

    res.status(200).json({
        success: true,
        message: "Agent updated successfully!",
        data: updatedAgent
    });
}

export const deleteAgentController = async (req, res) => {
    const agent = await deleteAgent(req.params.id);

    res.status(200).json({
        success: true,
        message: "Agent deleted successfully!",
        data: agent
    });
}