import { useState } from "react";
import axios from "axios";

const API = "http://localhost:5000/tickets";

function TicketForm({ refresh }) {

    const [form, setForm] = useState({
        subject: "",
        description: "",
        customerEmail: "",
        priority: "low"
    });

    const handleSubmit = async (e) => {

        e.preventDefault();

        await axios.post(API, form);

        refresh();

        setForm({
            subject: "",
            description: "",
            customerEmail: "",
            priority: "low"
        });
    };

    return (
        <form onSubmit={handleSubmit}>

            <input
                placeholder="Subject"
                value={form.subject}
                onChange={(e) =>
                    setForm({
                        ...form,
                        subject: e.target.value
                    })
                }
            />

            <textarea
                placeholder="Description"
                value={form.description}
                onChange={(e) =>
                    setForm({
                        ...form,
                        description: e.target.value
                    })
                }
            />

            <input
                placeholder="Email"
                value={form.customerEmail}
                onChange={(e) =>
                    setForm({
                        ...form,
                        customerEmail: e.target.value
                    })
                }
            />

            <select
                value={form.priority}
                onChange={(e) =>
                    setForm({
                        ...form,
                        priority: e.target.value
                    })
                }
            >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="urgent">Urgent</option>
            </select>

            <button type="submit">
                Create Ticket
            </button>

        </form>
    );
}

export default TicketForm;