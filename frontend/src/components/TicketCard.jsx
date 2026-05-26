import axios from "axios";

const API = "https://bajaj-test-backend-1r96.onrender.com/tickets";

function TicketCard({ ticket, refresh }) {

    const move = async (status) => {

        await axios.patch(
            `${API}/${ticket._id}`,
            { status }
        );

        refresh();
    };

    return (

        <div className="ticket">

            <h3>{ticket.subject}</h3>

            <p>{ticket.priority}</p>

            <p>
                {ticket.ageMinutes} mins
            </p>

            {
                ticket.slaBreached &&
                <span>⚠ SLA Breached</span>
            }

            {
                ticket.status === "open" &&
                <button
                    onClick={() =>
                        move("in_progress")
                    }
                >
                    Start
                </button>
            }

            {
                ticket.status === "in_progress" &&
                <>
                    <button
                        onClick={() =>
                            move("open")
                        }
                    >
                        Back
                    </button>

                    <button
                        onClick={() =>
                            move("resolved")
                        }
                    >
                        Resolve
                    </button>
                </>
            }

            {
                ticket.status === "resolved" &&
                <>
                    <button
                        onClick={() =>
                            move("in_progress")
                        }
                    >
                        Reopen
                    </button>

                    <button
                        onClick={() =>
                            move("closed")
                        }
                    >
                        Close
                    </button>
                </>
            }

        </div>
    );
}

export default TicketCard;