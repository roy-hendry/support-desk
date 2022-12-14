const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv").config();
const { errorHandler } = require("./middleware/errorMiddlware");
const connectDB = require("./config/db");
const PORT = process.env.PORT || 5000;

// Connect to database
connectDB();

const app = express();

// Allows us to send raw json
app.use(express.json());
// Allows us to accept the url encoded form
app.use(express.urlencoded({ extended: false }));

// The default until we send them to the appropriate routes
app.get("/", (req, res) => {
	res.status(200).json({ message: "Welcome to the Support Desk API" });
});

// Routes
// /api/users has been set to work on the userRoutes file's contents
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/tickets", require("./routes/ticketRoutes"));

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
