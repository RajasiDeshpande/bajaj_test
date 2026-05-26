function StatsStrip({ stats }) {

    return (
        <div>

            <p>Open: {stats.open}</p>

            <p>
                In Progress:
                {stats.in_progress}
            </p>

            <p>
                Resolved:
                {stats.resolved}
            </p>

            <p>
                Closed:
                {stats.closed}
            </p>

            <p>
                Breached:
                {stats.breached}
            </p>

        </div>
    );
}

export default StatsStrip;