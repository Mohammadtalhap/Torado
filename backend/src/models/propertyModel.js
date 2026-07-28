import mongoose from "mongoose";

const propertySchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },
        description: {
            type: String,
            required: true,
            trim: true
        },
        price: {
            type: Number,
            required: true,
            min: 0
        },
        address: {
            type: String,
            required: true,
            trim: true
        },
        propertyType: {
            type: String,
            enum: ["Residential", "Commertial", "Apartment"],
            required: true
        },
        purpose: {
            type: String,
            enum: ["Sale", "Rent"],
            required: true
        },
        bedrooms: {
            type: Number,
            required: true,
            min: 0
        },
        bathrooms: {
            type: Number,
            required: true,
            min: 0
        },
        garages: {
            type: Number,
            required: true,
            min: 0
        },
        sqft: {
            type: Number,
            required: true,
            min: 0
        },
        images: {
            type: [String],
            default: []
        }
    },
    {
        timestamps: true,
    }
);

const Property = mongoose.model("Property", propertySchema);

export default Property;