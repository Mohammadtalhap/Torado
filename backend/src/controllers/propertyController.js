import { createProperty, deleteProperty, getAllProperties, getPropertyById, updateProperty } from "../services/propertyService.js";

export const createPropertyController = async (req, res) => {
    const property = await createProperty(req.body);

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
    const property = await updateProperty(req.params.id, req.body);

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