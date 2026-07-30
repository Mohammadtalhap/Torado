import { createProperty, deleteProperty, getAllProperties, getPropertyById, updateProperty } from "../services/propertyService.js";

export const createPropertyController = async (req, res) => {
    const images = req.files?.map((file) => `/uploads/properties/${file.filename}`) || [];

    const propertyData = {
        ...req.body,
        images
    };

    const property = await createProperty(propertyData);

    res.status(201).json({
        success: true,
        message: "Property created successfully!",
        data: property
    });
}

export const getAllPropertiesController = async (req, res) => {
    const properties = await getAllProperties(req.query);

    res.status(200).json({
        success: true,
        message: "Properties fetched successfully!",
        data: properties
    });
}

export const getPropertyByIdController = async (req, res) => {
    const property = await getPropertyById(req.params.id);

    res.status(200).json({
        success: true,
        message: "Property fetched successfully!",
        data: property
    });
}

export const updatePropertyController = async (req, res) => {
    const images = req.files?.map((file) => `/uploads/properties/${file.filename}`) || [];

    const updateData = { ...req.body };

    if (images.length > 0) {
        updateData.images = images;
    }

    const property = await updateProperty(req.params.id, updateData);

    res.status(200).json({
        success: true,
        message: "Property updated successfully!",
        data: property
    });
}

export const deletePropertyController = async (req, res) => {
    const property = await deleteProperty(req.params.id);

    res.status(200).json({
        success: true,
        message: "Property deleted successfully!",
        data: property
    });
}