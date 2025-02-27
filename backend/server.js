const express = require("express");
const mysql = require("mysql"); // Use mysql2 if you want `execute()`
const cors = require("cors");
const bcrypt = require("bcryptjs");
require("dotenv").config(); // Load environment variables

const app = express();
app.use(express.json());
app.use(cors());

// Database connection
const db = mysql.createConnection({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "ipfrain",
    password: process.env.DB_PASSWORD || "123@Sold",
    database: process.env.DB_NAME || "simply_chocolate"
});

db.connect(err => {
    if (err) {
        console.error("Database connection failed: " + err.stack);
        return;
    }
    console.log("Connected to database.");
});

// ✅ Signup Route (with password hashing)
app.post("/api/signup", async (req, res) => {
    const { name, email, password } = req.body;

    // Log the incoming request payload
    console.log("Received signup request:", { name, email, password });

    // Validate required fields
    if (!name || !email || !password) {
        console.error("Validation error: All fields are required!");
        return res.status(400).json({ error: "All fields are required!" });
    }

    // Check if the email already exists
    const checkUserSql = "SELECT * FROM users WHERE email = ?";
    db.query(checkUserSql, [email], async (err, results) => {
        if (err) {
            console.error("Database error (checkUserSql):", err.message);
            return res.status(500).json({ error: "Database error. Please try again later." });
        }

        if (results.length > 0) {
            console.error("Validation error: Email already in use!");
            return res.status(400).json({ error: "Email already in use!" });
        }

        try {
            // Hash password before storing
            const hashedPassword = await bcrypt.hash(password, 10);
            console.log("Password hashed successfully:", hashedPassword);

            // Insert user into DB
            const insertSql = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
            db.query(insertSql, [name, email, hashedPassword], (err, result) => {
                if (err) {
                    console.error("Database error (insertSql):", err.message);
                    return res.status(500).json({ error: "Failed to register user. Please try again later." });
                }

                console.log("User inserted successfully:", result);
                res.json({ message: "User registered successfully!", userId: result.insertId });
            });
        } catch (hashError) {
            console.error("Password hashing error:", hashError);
            return res.status(500).json({ error: "Failed to process your request. Please try again later." });
        }
    });
});

// ✅ Login Route (Fixed)
app.post("/api/login", (req, res) => {
    const { email, password } = req.body;

    // Log the incoming request payload
    console.log("Received login request:", { email, password });

    const sql = "SELECT id, name, email, password FROM users WHERE email = ?";
    db.query(sql, [email], async (err, results) => {
        if (err) {
            console.error("Database error:", err.message);
            return res.status(500).json({ error: err.message });
        }

        if (results.length === 0) {
            console.error("User not found:", email);
            return res.status(401).json({ error: "User not found" });
        }

        const user = results[0];

        // Compare hashed passwords
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            console.error("Invalid credentials for user:", email);
            return res.status(401).json({ error: "Invalid credentials" });
        }

        // ✅ Send response back
        console.log("Login successful for user:", email);
        res.json({ message: "Login successful!", userId: user.id, name: user.name, email: user.email });
    });
});

// ✅ Get all users
app.get("/api/users", (req, res) => {
    const sql = "SELECT id, name, email FROM users"; // Excluding password for security
    db.query(sql, (err, results) => {
        if (err) {
            console.error("Database error:", err.message);
            return res.status(500).json({ error: err.message });
        }

        console.log("Fetched all users:", results);
        res.json(results);
    });
});

// Start server
app.listen(5000, () => {
    console.log("Server running on http://localhost:5000");
});