const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const path = require('path');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Email setup
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// API
app.post('/api/submit', async (req, res) => {
    try {
        const userData = req.body;

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: process.env.OWNER_EMAIL,
            subject: 'New Table Reservation - Sash Mandi Darbar',
            html: `
                <h2>New Reservation Request</h2>
                <p><strong>Name:</strong> ${userData.name}</p>
                <p><strong>Email:</strong> ${userData.email}</p>
                <p><strong>Phone:</strong> ${userData.phone}</p>
                <p><strong>Details:</strong> ${userData.message}</p>
            `
        });

        res.json({ success: true });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false });
    }
});

// ✅ Serve static files from ROOT
app.use(express.static(path.join(__dirname)));

// ✅ Serve index.html on root
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// ❌ DO NOT use '*' or '/*'

// Start server
const PORT = process.env.PORT || 5000;

(async () => {
    try {
        const server = await app.listen(PORT);
        console.log(`Server running on http://localhost:${PORT}`);
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
})();