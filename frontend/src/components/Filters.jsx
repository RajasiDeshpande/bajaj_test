function Filters({
    filters,
    setFilters
}) {

    return (
        <div>

            <select
                onChange={(e) =>
                    setFilters({
                        ...filters,
                        priority: e.target.value
                    })
                }
            >

                <option value="">
                    All
                </option>

                <option value="low">
                    Low
                </option>

                <option value="medium">
                    Medium
                </option>

                <option value="high">
                    High
                </option>

                <option value="urgent">
                    Urgent
                </option>

            </select>

            <label>

                <input
                    type="checkbox"
                    checked={filters.breached}
                    onChange={(e) =>
                        setFilters({
                            ...filters,
                            breached:
                                e.target.checked
                        })
                    }
                />

                SLA Breached

            </label>

        </div>
    );
}

export default Filters;