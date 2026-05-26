const SLA_LIMITS = {
    urgent: 60,
    high: 240,
    medium: 1440,
    low: 4320
};

const calculateDerivedFields = (ticket) => {

    const endTime =
        ticket.status === "resolved"
            ? ticket.resolvedAt
            : new Date();

    const ageMinutes = Math.floor(
        (endTime - ticket.createdAt) / (1000 * 60)
    );

    const slaBreached =
        ageMinutes > SLA_LIMITS[ticket.priority];

    return {
        ...ticket.toObject(),
        ageMinutes,
        slaBreached
    };
};

module.exports = {
    calculateDerivedFields
};