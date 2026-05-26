const express = require("express");

const {
    createTicket,
    getTickets,
    updateTicket,
    deleteTicket,
    getStats
} = require("../controllers/ticketController");

const router = express.Router();

router.post("/", createTicket);

router.get("/", getTickets);

router.patch("/:id", updateTicket);

router.delete("/:id", deleteTicket);

router.get("/stats", getStats);

module.exports = router;