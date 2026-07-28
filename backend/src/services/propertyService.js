import Property from "../models/propertyModel.js";
import ApiError from "../utils/apiError.js";
import ApiFeatures from "../utils/apiFeatures.js";

export const createProperty = async (propertyData) => {
    const property = await Property.create(propertyData);
    return property;
}

export const getAllProperties = async (query) => {

    const features = new ApiFeatures(
        Property.find(),
        query
    )
        .search()
        .filter()
        .sort()
        .pagination();

    const properties = await features.query;

    if (!properties || properties.length === 0) {
        throw new ApiError(404, "No properties exist.");
    }
    return properties;
}

export const getPropertyById = async (id) => {
    const property = await Property.findById(id);

    if (!property) {
        throw new ApiError(404, "Property not found.");
    }

    return property;
}

export const updateProperty = async (id, propertyData) => {
    const updatedProperty = await Property.findByIdAndUpdate(id, propertyData,
        {
            new: true,
            runValidators: true
        }
    );

    if (!updatedProperty) {
        throw new ApiError(404, "Property not found.");
    }

    return updatedProperty;
}

const findPropertyById = async (id) => {
    const property = await Property.findById(id);

    if (!property) {
        throw new ApiError(404, "Property not found.");
    }

    return property;
}

export const deleteProperty = async (id) => {
    const property = await findPropertyById(id);

    await property.deleteOne();

    return property;
}