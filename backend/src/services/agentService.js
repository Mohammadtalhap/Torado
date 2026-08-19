import Agent from "../models/agentModel.js";
import ApiError from "../utils/apiError.js";

/*==========================================
            Helper Functions 
==========================================*/

const findAgentById = async (id) => {
    const agent = await Agent.findById(id);

    if (!agent) {
        throw new ApiError(404, "Agent not found.");
    }

    return agent;
}

const findAgentByEmail = async (email) => {
    return await Agent.findOne({ email });
}

const checkDuplicateEmail = async (email, currentAgentId = null) => {
    const existingAgent = await findAgentByEmail(email);

    if (!existingAgent) return;

    if (
        currentAgentId &&
        existingAgent._id.toString() === currentAgentId
    ) {
        return;
    }

    throw new ApiError(400, "Agent with this email already exists.");
}

const prepareAgentData = (existingData, agentData) => {
    return {
        name: agentData.name ?? existingData.name,
        designation: agentData.designation ?? existingData.designation,
        email: agentData.email ?? existingData.email,
        phone: agentData.phone ?? existingData.phone,
        bio: agentData.bio ?? existingData.bio,
        experience: agentData.experience ?? existingData.experience,
        specialities: agentData.specialities ?? existingData.specialities,
        image: agentData.image ?? existingData.image,
    }
}

/*==========================================
            Service Functions 
==========================================*/

export const createAgent = async (agentData) => {
    await checkDuplicateEmail(agentData.email);

    const newAgent = await Agent.create({
        ...agentData
    });

    return newAgent;
}

export const getAllAgents = async () => {
    return await Agent.find().sort({ createdAt: -1 });
}

export const getAgentById = async (id) => {
    return await findAgentById(id);
}

export const updateAgent = async (id, agentData) => {
    const existingAgent = await findAgentById(id);

    if (agentData.email) {
        await checkDuplicateEmail(agentData.email, id);
    }

    const updatedData = prepareAgentData(existingAgent, agentData);

    Object.assign(existingAgent, updatedData);

    await existingAgent.save();

    return existingAgent;
}

export const deleteAgent = async (id) => {
    const agent = await findAgentById(id);

    await agent.deleteOne();

    return agent;
}