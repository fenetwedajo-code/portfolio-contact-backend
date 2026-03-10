// server.js
const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();
app.use(cors());
app.use(express.json()); // parse JSON requests

// POST API to store contact message
app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body;

   //  Log the received data
  console.log("Received data from frontend:", req.body);

  const sql = `INSERT INTO contacts (full_name, email, message) VALUES (?, ?, ?)`;

  db.query(sql, [name, email, message], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json({ message: "Contact saved successfully", id: result.insertId });
  });
});

// start server
app.listen(3000, () => {
  console.log("Server running on port 3000");
});