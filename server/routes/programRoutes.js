const express = require('express');
const router = express.Router();
const Program = require('../models/Program');

router.post('/', async (req, res) => {
    try {
        const { name, description } = req.body;

        if (!name) {
            return res.status(400).json({ error: 'Program name is required' });
        }

        const existingProgram = await Program.findOne({ name });
        if (existingProgram) {
            return res.status(400).json({ error: 'Program already exists' });
        }

        const program = new Program({ name, description });
        await program.save();

        res.status(201).json(program);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const programs = await Program.find().sort({ createdAt: -1 });
        res.json(programs);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;