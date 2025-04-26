// Import required modules
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const programRoutes = require('./routes/programRoutes');
const clientRoutes = require('./routes/clientRoutes');

// Initialize Express app
const app = express();

// Enhanced CORS configuration
app.use(cors({
    origin: 'http://localhost:5173', // Replace with your frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Middleware
app.use(bodyParser.json()); // Parse JSON request bodies
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Database connection (updated for MongoDB Driver v4+)
mongoose.connect('mongodb://127.0.0.1:27017/healthInfoSystem')
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => {
        console.error('MongoDB connection error:', err);
        process.exit(1); // Exit process on connection failure
    });

// Connection events
mongoose.connection.on('connected', () => {
    console.log('Mongoose connected to DB');
});

mongoose.connection.on('error', (err) => {
    console.log('Mongoose connection error:', err);
});

mongoose.connection.on('disconnected', () => {
    console.log('Mongoose disconnected');
});

// Routes
app.use('/api/programs', programRoutes);
app.use('/api/clients', clientRoutes);

// Basic route for testing
app.get('/', (req, res) => {
    res.send('Health Information System API is running');
});

// Test route
app.get('/api/test', (req, res) => {
    res.json({ message: 'Backend API is working!', timestamp: new Date() });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ message: 'Route not found' });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Internal server error' });
});

// Define the port
const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// Graceful shutdown
process.on('SIGINT', async () => {
    await mongoose.connection.close();
    console.log('Mongoose connection closed through app termination');
    process.exit(0);
});

app.get('/clients/:id', async (req, res) => {
    const client = await Client.findById(req.params.id).populate('programs');
    if (!client) {
        return res.status(404).send({ error: 'Client not found' });
    }
    res.send(client);
});