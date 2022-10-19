const express = require("express");
const dotenv = require("dotenv").config();
const { errorHandler } = require("./middleware/errorMiddlware");
const PORT = process.env.PORT || 5000;

const app = express();

// Allows us to send raw json
app.use(express.json());
// Allows us to accept the url encoded form
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
	res.status(200).json({ message: "Welcome to the Support Desk API" });
});

// Routes
// /api/users has been set to work on the userRoutes file's contents
app.use("/api/users", require("./routes/userRoutes"));

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
