function ColumnVisibility({ columns, hiddenColumnIds, onChange }) {
    return (
      <div className="column-visibility">
        <p>Toggle columns:</p>
        {columns.map(col => (
          <label key={col.id}>
            <input
              type="checkbox"
              checked={!hiddenColumnIds.has(col.id)}
              onChange={() => onChange(col.id)}
            />
            {col.title}
          </label>
        ))}
      </div>
    )
  }
  
  export default ColumnVisibility