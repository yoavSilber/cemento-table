# Cemento Table — Client Side Assignment 1

A reusable, generic React table component built for the Cemento client-side assignment. Supports multiple data types, inline editing, column visibility toggling, and is optimized for large datasets via custom row virtualization.

---

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## Table API

The `<Table />` component accepts a single dataset shape:

```jsx
<Table columns={columns} data={data} />
```

| Prop | Type | Description |
|---|---|---|
| `columns` | `Column[]` | Column definitions (see schema below) |
| `data` | `Row[]` | Array of row objects |

### Column Schema

```js
{
  id: string,          // Unique column identifier. Must match the key in each row object.
  ordinalNo: number,   // Display order (ascending)
  title: string,       // Column header label
  type: string,        // Cell type — see supported types below
  width?: number,      // Column width in pixels (default: 150)

  // === Schema extensions (added, not modified) ===
  editable?: boolean,  // Whether the cell can be edited. Default: true
  options?: Array<{ value: string, label: string }> // Required when type === 'select'
}
```

### Schema Extensions

Two properties were added to the column schema. Per the Q&A, existing properties were not modified or removed.

| Property | Rationale |
|---|---|
| `editable?: boolean` | Allows specific columns (e.g. `id`) to be marked read-only. Realistic table behavior with minimal cost. Defaults to `true` so existing schemas are unaffected. |
| `options?: Array<{ value, label }>` | Required for `select` type columns. The assignment left the option source open — storing options in the column definition is the simplest and most self-contained approach. |

### Supported Cell Types

| Type | Display | Editor |
|---|---|---|
| `string` | Plain text | Text input |
| `number` | Plain number | Number input |
| `boolean` | ✓ / ✗ | Checkbox |
| `select` | Option label | Dropdown |
| `date` | Formatted date (e.g. Jan 12, 2025) | Date picker |

### Row Schema

```js
{
  id: string,           // Unique row identifier
  [columnId]: any       // One key per column, matching column.id
}
```

---

## Key Technical Decisions

### Custom row virtualization
Only the rows visible in the viewport (~20 rows) are mounted in the DOM at any time. As the user scrolls, rows are swapped in and out. This keeps rendering fast regardless of dataset size (tested with 10,000 rows).

I implemented this without relying on a table library — a `VirtualList` component tracks scroll position and calculates which row indices to render using simple arithmetic.

### React.memo + useCallback
`Row` is wrapped in `React.memo` so it only re-renders when its own data changes. Handlers (`startEdit`, `commitEdit`, `cancelEdit`) are wrapped in `useCallback` with empty dependencies so their references stay stable between renders. Together, editing one cell triggers a re-render of only that row — not all 10,000.

### No table library
The assignment explicitly asks to evaluate logical thinking and component structure, so no table library (TanStack Table, ag-grid, etc.) was used. All rendering, virtualization, and editing logic is custom.

### Local state only
Edits are saved to React state (`useState`) inside `Table`. No backend, no localStorage — per the assignment spec. Refreshing the page resets to the generated mock data.

---

## Project Structure

```
src/
  Table/
    Table.jsx            # Main component — owns all state
    Row.jsx              # Memoized row component
    CellRenderer.jsx     # Picks read/edit component by column type
    ColumnVisibility.jsx # Column toggle panel
    VirtualList.jsx      # Custom row virtualization
    constants.js         # CELL_TYPES constant
  cells/
    StringCell.jsx
    NumberCell.jsx
    BooleanCell.jsx
    SelectCell.jsx
    DateCell.jsx
  mock/
    generateData.js      # Faker-based data generator (10,000 rows)
  App.jsx                # Example consumer — demonstrates generic usage
```

---

## What I'd Add With More Time

- **Column sorting** — click a header to sort ascending/descending
- **Search/filter** — filter rows by value across columns
- **Column resizing** — drag header borders to resize columns
- **Persistent state** — save edits to localStorage so changes survive a refresh
- **Row addition/deletion** — full CRUD, not just edit
