import { CELL_TYPES } from './constants'
import StringCell from '../cells/StringCell'
import NumberCell from '../cells/NumberCell'
import BooleanCell from '../cells/BooleanCell'
import SelectCell from '../cells/SelectCell'
import DateCell from '../cells/DateCell'

function CellRenderer({ column, value, isEditing, onStartEdit, onCommit, onCancel }) {
  const canEdit = column.editable !== false

  if (isEditing) {
    return (
      <CellEditor
        column={column}
        value={value}
        onCommit={onCommit}
        onCancel={onCancel}
      />
    )
  }

  return (
    <div
      onClick={canEdit ? onStartEdit : undefined}
      style={{ cursor: canEdit ? 'pointer' : 'default' }}
    >
      {(() => {
        switch (column.type) {
          case CELL_TYPES.NUMBER:  return <NumberCell value={value} />
          case CELL_TYPES.BOOLEAN: return <BooleanCell value={value} />
          case CELL_TYPES.SELECT:  return <SelectCell value={value} column={column} />
          case CELL_TYPES.DATE:    return <DateCell value={value} />
          default:                 return <StringCell value={value} />
        }
      })()}
    </div>
  )
}

function CellEditor({ column, value, onCommit, onCancel }) {
  const handleKey = (e) => {
    if (e.key === 'Enter') onCommit(e.target.value)
    if (e.key === 'Escape') onCancel()
  }

  switch (column.type) {
    case CELL_TYPES.BOOLEAN:
      return (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <input
            type="checkbox"
            defaultChecked={value}
            autoFocus
            onChange={(e) => onCommit(e.target.checked)}
          />
        </div>
      )
    case CELL_TYPES.SELECT:
      return (
        <select
          defaultValue={value}
          autoFocus
          onBlur={(e) => onCommit(e.target.value)}
          onChange={(e) => onCommit(e.target.value)}
        >
          {column.options?.map(o => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
      )
    case CELL_TYPES.NUMBER:
      return (
        <input
          type="number"
          defaultValue={value}
          autoFocus
          onBlur={(e) => onCommit(Number(e.target.value))}
          onKeyDown={handleKey}
        />
      )
    case CELL_TYPES.DATE:
      return (
        <input
          type="date"
          defaultValue={value}
          autoFocus
          onBlur={(e) => onCommit(e.target.value)}
          onKeyDown={handleKey}
        />
      )
    default:
      return (
        <input
          type="text"
          defaultValue={value}
          autoFocus
          onBlur={(e) => onCommit(e.target.value)}
          onKeyDown={handleKey}
        />
      )
  }
}

export default CellRenderer