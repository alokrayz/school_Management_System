import { validationResult } from "express-validator";
import { addSchool, listSchools, findSchoolByNameAndAddress } from "../models/school.js";

// Haversine formula
function haversineDistance(lat1, lon1, lat2, lon2) {
    function toRad(deg) {
        return deg * (Math.PI / 180);
    }
    const R = 6371;
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a = Math.sin(dLat / 2) ** 2 +
              Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
              Math.sin(dLon / 2) ** 2;
    return R * a;
}

// POST /addSchool
const addSchool1 = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { name, address, latitude, longitude } = req.body;

    try {
        // Check for duplicate
        const existing = await findSchoolByNameAndAddress(name, address);
        if (existing) {
            return res.status(400).json({
                success: false,
                message: "School already exists"
            });
        }

        const id = await addSchool(
            name,
            address,
            parseFloat(latitude),
            parseFloat(longitude)
        );

        res.status(201).json({
            success: true,
            message: "School added successfully",
            data: {
                id,
                name,
                address,
                latitude: parseFloat(latitude),
                longitude: parseFloat(longitude)
            }
        });

    } catch (err) {
        console.error("Error adding school:", err);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

// GET /listSchools
const listSchools1 = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
    }

    const userLat = parseFloat(req.query.latitude);
    const userLon = parseFloat(req.query.longitude);
    const limit = req.query.limit ? parseInt(req.query.limit) : null;

    try {
        const schools = await listSchools();
        const withDistances = schools.map(s => ({
            ...s,
            latitude: parseFloat(s.latitude),
            longitude: parseFloat(s.longitude),
            distance_km: Math.round(
                haversineDistance(userLat, userLon, s.latitude, s.longitude) * 1000
            ) / 1000.0
        }));

        withDistances.sort((a, b) => a.distance_km - b.distance_km);

        res.json({
            success: true,
            count: limit ? withDistances.slice(0, limit).length : withDistances.length,
            data: limit ? withDistances.slice(0, limit) : withDistances
        });

    } catch (err) {
        console.error("Error listing schools:", err);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

export { addSchool1 as addSchool, listSchools1 as listSchools };
