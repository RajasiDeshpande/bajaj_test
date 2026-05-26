const Ticket = require("../models/Ticket");
const { calculateDerivedFields } = require("../utils/ticketUtils");

const statusFlow = [
    "open",
    "in_progress",
    "resolved",
    "closed"
];

exports.createTicket = async (req, res) => {
    try {

        const ticket = await Ticket.create(req.body);

        res.status(201).json(ticket);

    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};

exports.getTickets = async (req, res) => {

    try {

        const query = {};

        if (req.query.status) {
            query.status = req.query.status;
        }

        if (req.query.priority) {
            query.priority = req.query.priority;
        }

        const tickets = await Ticket.find(query);

        let updatedTickets =
            tickets.map(calculateDerivedFields);

        if (req.query.breached === "true") {
            updatedTickets =
                updatedTickets.filter(
                    t => t.slaBreached
                );
        }

        res.json(updatedTickets);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

exports.updateTicket = async (req, res) => {

    try {

        const ticket =
            await Ticket.findById(req.params.id);

        if (!ticket) {
            return res.status(404).json({
                message: "Ticket not found"
            });
        }

        const oldIndex =
            statusFlow.indexOf(ticket.status);

        const newIndex =
            statusFlow.indexOf(req.body.status);

        const diff = newIndex - oldIndex;

        const valid =
            diff === 1 || diff === -1;

        if (!valid) {
            return res.status(400).json({
                message: "Invalid status transition"
            });
        }

        ticket.status = req.body.status;

        if (req.body.status === "resolved") {
            ticket.resolvedAt = new Date();
        }

        if (
            ticket.status === "in_progress" &&
            ticket.resolvedAt
        ) {
            ticket.resolvedAt = null;
        }

        await ticket.save();

        res.json(
            calculateDerivedFields(ticket)
        );

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

exports.deleteTicket = async (req, res) => {

    try {

        await Ticket.findByIdAndDelete(
            req.params.id
        );

        res.json({
            message: "Ticket deleted"
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

exports.getStats = async (req, res) => {

    try {

        const tickets = await Ticket.find();

        const stats = {
            open: 0,
            in_progress: 0,
            resolved: 0,
            closed: 0,
            breached: 0
        };

        tickets.forEach(ticket => {

            stats[ticket.status]++;

            const updated =
                calculateDerivedFields(ticket);

            if (
                updated.slaBreached &&
                ticket.status !== "resolved" &&
                ticket.status !== "closed"
            ) {
                stats.breached++;
            }
        });

        res.json(stats);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};