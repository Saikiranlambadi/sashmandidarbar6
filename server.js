const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Email setup
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS }
});

// API endpoint
app.post('/api/submit', async (req, res) => {
    try {
        const userData = req.body;

        // Send email to owner
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
        res.status(500).json({ success: false, message: error.message });
    }
});
// Serve all static frontend files
app.use(express.static(__dirname));

// For any other route, serve the index.html so the website loads
app.get("*", (req, res) => {
    res.sendFile(__dirname + '/index.html');
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));