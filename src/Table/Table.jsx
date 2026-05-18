import { useState, useCallback } from 'react'
import ColumnVisibility from './ColumnVisibility'
import Row, { ROW_HEIGHT } from './Row'
import VirtualList from './VirtualList'

const LIST_HEIGHT = 600

function Table({ columns, data }) {
  const [editingCell, setEditingCell] = useState(null) // the rows (edits update this)
  const [tableData, setTableData] = useState(data) // { rowId, columnId } or null
  const [hiddenColumnIds, setHiddenColumnIds] = useState(new Set()) //Set of hidden column ids
  const [showVisibilityPanel, setShowVisibilityPanel] = useState(false)

  const sortedColumns = [...columns]
    .sort((a, b) => a.ordinalNo - b.ordinalNo)
    .filter(col => !hiddenColumnIds.has(col.id))

  const totalWidth = sortedColumns.reduce((sum, col) => sum + (col.width ?? 150), 0)

  const toggleColumn = useCallback((columnId) => {
    setHiddenColumnIds(prev => {
      const next = new Set(prev)
      next.has(columnId) ? next.delete(columnId) : next.add(columnId)
      return next
    })
  }, [])
  
  const startEdit = useCallback((rowId, columnId) => {
    setEditingCell({ rowId, columnId })
  }, [])
  
  const commitEdit = useCallback((rowId, columnId, newValue) => {
    setTableData(prev =>
      prev.map(row => row.id === rowId ? { ...row, [columnId]: newValue } : row)
    )
    setEditingCell(null)
  }, [])
  
  const cancelEdit = useCallback(() => {
    setEditingCell(null)
  }, [])

  return (
    <div className="table-wrapper">
      <div className="table-toolbar">
        <button onClick={() => setShowVisibilityPanel(prev => !prev)}>
          Columns
        </button>
        {showVisibilityPanel && (
          <ColumnVisibility
            columns={[...columns].sort((a, b) => a.ordinalNo - b.ordinalNo)}
            hiddenColumnIds={hiddenColumnIds}
            onChange={toggleColumn}
          />
        )}
      </div>

      <div style={{ overflowX: 'auto' }}>
        <div style={{ width: totalWidth }}>
          {/* Header */}
          <div className="table-header" style={{ display: 'flex' }}>
            {sortedColumns.map(col => (
              <div
                key={col.id}
                style={{
                  width: col.width,
                  minWidth: col.width,
                  maxWidth: col.width,
                  padding: '8px',
                  boxSizing: 'border-box',
                  overflow: 'hidden',
                  whiteSpace: 'nowrap',
                  textOverflow: 'ellipsis',
                }}
              >
                {col.title}
              </div>
            ))}
          </div>

          {/* Empty state */}
          {tableData.length === 0 && (
            <div className="table-empty">No data to display.</div>
          )}

          {/* Virtualized rows */}
          <VirtualList
            itemCount={tableData.length}
            itemHeight={ROW_HEIGHT}
            height={LIST_HEIGHT}
            width={totalWidth}
            renderItem={(index) => {
              const row = tableData[index]
              const editingColumnId = editingCell?.rowId === row.id ? editingCell.columnId : null
              return (
              <Row
                key={row.id}
                row={row}
                columns={sortedColumns}
                editingColumnId={editingColumnId}
                onStartEdit={startEdit}
                onCommit={commitEdit}
                onCancel={cancelEdit}
              />
            )}}
          />
        </div>
      </div>
    </div>
  )
}

export default Table
