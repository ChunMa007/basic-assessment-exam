require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const users = [
    { email: "admin@gmail.com", password: "admin123" },
];

app.post("/api/login", (req, res) => {
    const { email, password } = req.body;
    const user = users.find(u => u.email === email && u.password === password);

    if (!user) {
        return res.status(401).json({ message: "Invalid Credentials" });
    }

    res.json({
        message: "Login Successful",
        user: { email: user.email }
    });
});

app.get("/", (req, res) => {
    res.send("Backend API is running");
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
