const formatter = new Intl.DateTimeFormat('en-US', { dateStyle: 'medium' })

function DateCell({ value }) {
  if (!value) return <span>—</span>
  return <span>{formatter.format(new Date(value))}</span>
}

export default DateCell