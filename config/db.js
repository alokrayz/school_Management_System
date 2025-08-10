import { createConnection } from 'mysql2/promise';
import { config } from 'dotenv';
config();

const db = await createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'Alokray@123',
    database: process.env.DB_NAME || 'schooldb',
});
console.log('Database connected successfully'); 
export default db;