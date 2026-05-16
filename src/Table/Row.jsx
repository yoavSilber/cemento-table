import { memo } from 'react'
import CellRenderer from './CellRenderer'

const ROW_HEIGHT = 40

function Row({ row, columns, editingCell, onStartEdit, onCommit, onCancel }) {
  return (
    <div className="table-row" style={{ display: 'flex', height: ROW_HEIGHT, alignItems: 'center', flexShrink: 0 }}>
      {columns.map(col => (
        <div
          key={col.id}
          style={{
            width: col.width,
            minWidth: col.width,
            flexShrink: 0,
            overflow: col.id === 'id' ? 'visible' : 'hidden',
            whiteSpace: 'nowrap',
            textOverflow: col.id === 'id' ? 'clip' : 'ellipsis',
            padding: '0 8px',
            boxSizing: 'border-box',
            fontFamily: col.id === 'id' ? 'ui-monospace, monospace' : undefined,
          }}
        >
          <CellRenderer
            column={col}
            value={row[col.id]}
            isEditing={editingCell?.rowId === row.id && editingCell?.columnId === col.id}
            onStartEdit={() => onStartEdit(row.id, col.id)}
            onCommit={(newValue) => onCommit(row.id, col.id, newValue)}
            onCancel={onCancel}
          />
        </div>
      ))}
    </div>
  )
}

export { ROW_HEIGHT }
export default memo(Row)