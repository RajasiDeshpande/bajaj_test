import TicketCard from "./TicketCard";

const statuses = [
    "open",
    "in_progress",
    "resolved",
    "closed"
];

function Board({ tickets, refresh }) {

    return (
        <div className="board">

            {statuses.map(status => (

                <div className="column" key={status}>

                    <h2>{status}</h2>

                    {
                        tickets
                        .filter(
                            t => t.status === status
                        )
                        .map(ticket => (
                            <TicketCard
                                key={ticket._id}
                                ticket={ticket}
                                refresh={refresh}
                            />
                        ))
                    }

                </div>
            ))}

        </div>
    );
}

export default Board;