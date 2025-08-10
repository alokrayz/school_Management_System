import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import schoolRoutes from './routes/schoolRoutes.js';

const app = express();
app.use(bodyParser.json());

// Sucessfull Health check
app.get('/', (req, res) => {
  res.json({ success: true, message: 'School API is running' });
});

// Routes
app.use('/', schoolRoutes);

// Error 
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Endpoint not found' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT , ()=> {
    console.log(`Server is running on port ${PORT}`);
})
