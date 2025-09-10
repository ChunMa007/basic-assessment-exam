require("dotenv").config();
const express = require("express");
const cors = require("cors");
const users = require("./users");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 8000

app.post("/api/login", (req, res) => {
    const { email, password } = req.body;
    const user = users.find(user => user.email === email && user.password === password);

    if(!user) {
        return res.status(401).json({
            message: "Invalid Credentials"
        });
    }

    res.json({
        message: "Login Successful",
        user: {user: user.email},
    });
});


app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`))