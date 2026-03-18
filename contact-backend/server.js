// server.js
const express = require('express');
const cors = require('cors');
const db = require('./db');

// ===== Nodemailer added here =====
const nodemailer = require("nodemailer");
// ================================

const app = express();
app.use(cors());
app.use(express.json()); // parse JSON requests


// ===== Nodemailer transporter configuration =====
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "fenetwedajo@gmail.com",        // <-- replace with your Gmail
    pass: "kmqokmipcqeolzyg"            // <-- replace with Gmail App Password
  }
});
// ================================================


// POST API to store contact message
app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body;

  // Log the received data
  console.log("Received data from frontend:", req.body);

  const sql = `INSERT INTO contacts (full_name, email, message) VALUES (?, ?, ?)`;

  db.query(sql, [name, email, message], async (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Database error" });
    }

    // ===== Email sending added here =====
    const mailOptions = {
      from: email, // sender (user email)
      to: "fenetwedajo@gmail.com", // your email where messages arrive
      subject: "New Portfolio Contact Message",
      text: `
      Name: ${name}
      Email: ${email}
      Message: ${message}
      `
    };

    try {
      await transporter.sendMail(mailOptions);
      console.log("Email sent successfully");
    } catch (error) {
      console.error("Email sending failed:", error);
    }
    // ====================================

    res.json({ message: "Contact saved successfully", id: result.insertId });
  });
});


// start server
app.listen(3000, () => {
  console.log("Server running on port 3000");
});