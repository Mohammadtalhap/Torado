import mongoose from "mongoose";

const agentSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },

        designation: {
            type: String,
            required: true,
            trim: true,
        },

        email: {
            type: String,
            required: true,
            trim: true,
            unique: true,
            lowercase: true,
        },

        phone: {
            type: String,
            required: true,
            trim: true,
        },

        image: {
            type: String,
            default: "",
        },

        bio: {
            type: String,
            default: "",
        },

        experience: {
            type: Number,
            default: 0,
        },

        specialities: [
            {
                type: String,
                trim: true,
                enum: ["Residential", "Commercial", "Apartment"],
            }
        ],
    },
    {
        timestamps: true,
    }
);

const Agent = mongoose.model("Agent", agentSchema);

export default Agent;