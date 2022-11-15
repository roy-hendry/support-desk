const express = require("express");
const router = express.Router();
const {
	getTickets,
	getTicket,
	createTicket,
	deleteTicket,
	updateTicket,
} = require("../controllers/ticketController");

const { protect } = require("../middleware/authMiddleware");

// Re-route into note router
const noteRouter = require("./noteRoutes")
router.use("/:ticketId/notes", noteRouter)

// By using route("/") we can stack multiple types of requests onto the route. This way we don't need to do get and post requests seperately
router.route("/").get(protect, getTickets).post(protect, createTicket);

// Now when we are on the route for the ticket id we can perform these seperare requests
router
	.route("/:id")
	.get(protect, getTicket)
	.delete(protect, deleteTicket)
	.put(protect, updateTicket);

module.exports = router;
