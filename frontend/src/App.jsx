import { useEffect, useState } from "react";
import axios from "axios";

import Board from "./components/Board";
import TicketForm from "./components/TicketForm";
import Filters from "./components/Filters";
import StatsStrip from "./components/StatsStrip";

const API = "http://localhost:5000/tickets";

function App() {

  const [tickets, setTickets] = useState([]);
  const [stats, setStats] = useState({});
  const [filters, setFilters] = useState({
    priority: "",
    breached: false
  });

  const fetchTickets = async () => {

    let url = API + "?";

    if (filters.priority) {
      url += `priority=${filters.priority}&`;
    }

    if (filters.breached) {
      url += "breached=true";
    }

    const res = await axios.get(url);

    setTickets(res.data);
  };

  const fetchStats = async () => {
    const res =
      await axios.get(`${API}/stats`);

    setStats(res.data);
  };

  useEffect(() => {
    fetchTickets();
    fetchStats();
  }, [filters]);

  return (
    <div>

      <h1>DeskFlow</h1>

      <StatsStrip stats={stats} />

      <Filters
        filters={filters}
        setFilters={setFilters}
      />

      <TicketForm
        refresh={fetchTickets}
      />

      <Board
        tickets={tickets}
        refresh={fetchTickets}
      />

    </div>
  );
}

export default App;