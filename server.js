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

// API endpoint
app.post('/api/submit', async (req, res) => {
    try {
        const userData = req.body;

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: process.env.OWNER_EMAIL,
            subject: 'New User Registration',
            html: `<h2>New User Details:</h2>
                   <p>Name: ${userData.name}</p>
                   <p>Email: ${userData.email}</p>
                   <p>Phone: ${userData.phone || 'Not provided'}</p>
                   <p>Message: ${userData.message || 'None'}</p>`
        });

        res.json({ success: true, message: 'Submitted successfully!' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
});

// Serve static frontend
app.use(express.static(__dirname));

// ✅ FIXED fallback (no '*' or '/*')
app.use((req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));