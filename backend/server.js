const express = require("express");
const dotenv = require("dotenv").config();
const PORT = process.env.PORT || 5000;

const app = express();

app.get("/", (req, res) => {
	res.status(200).json({ message: "Welcome to the Support Desk API" });
});

// Routes
// /api/users has been set to work on the userRoutes file's contents
app.use("/api/users", require("./routes/userRoutes"))

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
