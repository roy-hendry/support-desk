const express = require("express");
const router = express.Router({ mergeParams: true });
const { getNotes, addNote } = require("../controllers/noteController");

const { protect } = require("../middleware/authMiddleware");

router.route("/").get(protect, getNotes).post(protect, addNote);

module.exports = router;

// We want the route to be formatted like this:
// /api/tickets/:ticketId/notes
// Due to this we need to do something a little different
