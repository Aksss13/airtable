const express = require('express');
const router = express.Router();
const Table = require('../models/table');

// Create a new dynamic table
router.post('/create', async (req, res) => {
    // ✅ Add this line to debug incoming request body
    console.log('📥 Incoming POST /create:', req.body);

    const { tableName, fields, createdBy } = req.body;

    if (!tableName || !Array.isArray(fields) || !createdBy) {
        return res.status(400).json({ message: 'Missing required fields or invalid data' });
    }

    try {
        const newTable = new Table({
            name: tableName,
            fields,
            createdBy
        });

        await newTable.save();

        res.status(201).json({
            message: '✅ Table created successfully',
            table: newTable
        });
    } catch (error) {
        console.error('❌ Error saving table:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

module.exports = router;
