function BooleanCell({ value }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <span>{value ? '✓' : '✗'}</span>
    </div>
  )
}

export default BooleanCell