const express = require('express');
const router = express.Router();
const Client = require('../models/Client');
const Program = require('../models/Program');

router.post('/', async (req, res) => {
    try {
        const { firstName, lastName, dateOfBirth, gender, contactInfo } = req.body;

        if (!firstName || !lastName || !dateOfBirth || !gender) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const client = new Client({
            firstName,
            lastName,
            dateOfBirth,
            gender,
            contactInfo
        });

        await client.save();
        res.status(201).json(client);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Add other client routes here...
// Get all clients
router.get('/', async (req, res) => {
    try {
        const clients = await Client.find().sort({ createdAt: -1 });
        res.json(clients);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
router.get('/search', async (req, res) => {
    try {
        const { query } = req.query;

        if (!query) {
            return res.status(400).json({ error: 'Search query is required' });
        }

        const clients = await Client.find({
            $or: [
                { firstName: { $regex: query, $options: 'i' } },
                { lastName: { $regex: query, $options: 'i' } },
                { 'contactInfo.phone': { $regex: query, $options: 'i' } },
                { 'contactInfo.email': { $regex: query, $options: 'i' } }
            ]
        });

        res.json(clients);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// Get single client by ID with enrolled programs populated
// Get a client by ID
// GET single client
router.get('/:id', async (req, res) => {
    try {
        console.log("Fetching client with ID:", req.params.id);
        const client = await Client.findById(req.params.id);

        if (!client) {
            console.log("Client not found in database");
            return res.status(404).json({ message: 'Client not found' });
        }

        console.log("Client found:", client);
        res.json(client);
    } catch (err) {
        console.error("Database error:", err);
        res.status(500).json({ message: err.message });
    }
});

// Enroll client in programs
router.post('/:id/enroll', async (req, res) => {
    try {
        const { programIds } = req.body;
        const clientId = req.params.id;

        if (!programIds || !Array.isArray(programIds)) {
            return res.status(400).json({ error: 'Program IDs array is required' });
        }

        const client = await Client.findById(clientId);
        if (!client) {
            return res.status(404).json({ error: 'Client not found' });
        }

        const programs = await Program.find({ _id: { $in: programIds } });
        if (programs.length !== programIds.length) {
            return res.status(400).json({ error: 'One or more programs not found' });
        }

        // Add programs avoiding duplicates
        const newPrograms = programIds.filter(id =>
            !client.enrolledPrograms.includes(id)
        );
        client.enrolledPrograms.push(...newPrograms);
        await client.save();

        // Return client with populated programs
        const updatedClient = await Client.findById(clientId)
            .populate('enrolledPrograms');

        res.json(updatedClient);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Unenroll client from programs
router.post('/:id/unenroll', async (req, res) => {
    try {
        const { programIds } = req.body;
        const clientId = req.params.id;

        if (!programIds || !Array.isArray(programIds)) {
            return res.status(400).json({ error: 'Program IDs array is required' });
        }

        const client = await Client.findById(clientId);
        if (!client) {
            return res.status(404).json({ error: 'Client not found' });
        }

        // Remove programs
        client.enrolledPrograms = client.enrolledPrograms.filter(id =>
            !programIds.includes(id.toString())
        );
        await client.save();

        // Return client with populated programs
        const updatedClient = await Client.findById(clientId)
            .populate('enrolledPrograms');

        res.json(updatedClient);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;