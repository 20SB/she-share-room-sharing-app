const awsS3 = require("../config/aws");
const RentalListing = require("../models/rentalListing");

module.exports.addService = async (req, res) => {
    try {
        const user = req.user;
        const {
            roomDetails,
            city,
            area,
            location,
            amenities,
            rate,
            minRentalTime,
            maxRentalTime,
            availableDates,
        } = req.body;

        const images = [];
        if (req.files) {
            const folderName = "RoomImages";
            for (const file of req.files) {
                const data = await awsS3.upload(folderName, file);
                images.push(data.Location);
            }
        }

        const newRentalListing = new RentalListing({
            host: user,
            roomDetails,
            city,
            area,
            location,
            amenities,
            rate,
            minRentalTime,
            maxRentalTime,
            availableDates,
            images,
        });

        const savedListing = await newRentalListing.save();
        res.status(201).json({ message: "Created new Service Successfully", savedListing });
    } catch (error) {
        console.error("Error in signUp:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

module.exports.updateService = async (req, res) => {
    try {
        const { serviceId } = req.query;
        const {
            roomDetails,
            city,
            area,
            location,
            amenities,
            rate,
            minRentalTime,
            maxRentalTime,
            availableDates,
        } = req.body;

        const updatedListing = await RentalListing.findByIdAndUpdate(
            serviceId,
            {
                roomDetails,
                city,
                area,
                location,
                amenities,
                rate,
                minRentalTime,
                maxRentalTime,
                availableDates,
            },
            { new: true }
        );

        res.status(201).json({ message: "Updated the Service Successfully", updatedListing });
    } catch (error) {
        console.error("Error in signUp:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

module.exports.addImagesToService = async (req, res) => {
    try {
        const { serviceId } = req.query;

        const service = await RentalListing.findById(serviceId);
        if (!service) {
            return res.status(404).json({ message: "Invalid Service Id" });
        }

        if (req.files) {
            const folderName = "RoomImages";
            for (const file of req.files) {
                const data = await awsS3.upload(folderName, file);
                service.images.push(data.Location);
            }
        }
        await service.save();

        res.status(201).json({ message: "Added Images Successfully", updatedListing: service });
    } catch (error) {
        console.error("Error in signUp:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

module.exports.removeImagesFromService = async (req, res) => {
    try {
        const { serviceId } = req.query;

        const service = await RentalListing.findById(serviceId);
        if (!service) {
            return res.status(404).json({ message: "Invalid Service Id" });
        }

        const { imageUrl } = req.body;
        await awsS3.delete(imageUrl);
        service.images = service.images.filter((image) => image !== imageUrl);
        await service.save();

        res.status(201).json({ message: "Image Deleted Successfully" });
    } catch (error) {
        console.error("Error in signUp:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

module.exports.deleteService = async (req, res) => {
    try {
        const { serviceId } = req.query;

        const service = await RentalListing.findByIdAndDelete(serviceId);
        if (!service) {
            return res.status(404).json({ message: "Rental listing not found" });
        }

        for (const imageUrl of service.images) {
            await awsS3.delete(imageUrl);
        }

        res.status(200).json({
            message: "Rental listing and associated images deleted successfully",
        });
    } catch (error) {
        console.error("Error deleting rental listing:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports.getRentalListingsByCity = async (req, res) => {
    try {
        const { city } = req.query;

        // Case-insensitive regex query to match city
        const regex = new RegExp(`^${city}$`, "i");

        // Query rental listings by city using case-insensitive regex and sort by createdAt in descending order (most recent first)
        const rentalListings = await RentalListing.find({ city: regex })
            .populate("host")
            .sort({ createdAt: -1 })
            .exec();

        if (!rentalListings || rentalListings.length === 0) {
            return res.status(404).json({ message: "No rental listings found for this city" });
        }

        res.status(200).json({ rentalListings });
    } catch (error) {
        console.error("Error fetching rental listings by city:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports.getRentalListingsOfaUser = async (req, res) => {
    try {
        const user = req.user;

        // Query rental listings by city using case-insensitive regex and sort by createdAt in descending order (most recent first)
        const rentalListings = await RentalListing.find({ host: user._id })
            .populate("host")
            .sort({ createdAt: -1 })
            .exec();

        if (!rentalListings || rentalListings.length === 0) {
            return res.status(404).json({ message: "No rental listings found for this city" });
        }

        res.status(200).json({ rentalListings });
    } catch (error) {
        console.error("Error fetching rental listings by city:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
