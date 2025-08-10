import db from "../config/db.js";

export const addSchool = async (name, address, latitude, longitude) => {
    const [result] = await db.execute(
        "INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)",
        [name, address, latitude, longitude]
    );
    return result.insertId;
};

export const listSchools = async () => {
    const [rows] = await db.execute("SELECT * FROM schools");
    return rows;
};

//find school by name & address
export const findSchoolByNameAndAddress = async (name, address) => {
    const [rows] = await db.execute(
        "SELECT * FROM schools WHERE name = ? AND address = ? LIMIT 1",
        [name, address]
    );
    return rows.length > 0 ? rows[0] : null;
};
