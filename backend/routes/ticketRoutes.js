const express = require("express");
const router = express.Router();
const { getTickets, createTicket } = require("../controllers/ticketController");

const { protect } = require("../middleware/authMiddleware");

// By using route("/") we can stack multiple types of requests onto the route. This way we don't need to do get and post requests seperately
router.route("/").get(protect, getTickets).post(protect, createTicket);

module.exports = router;
