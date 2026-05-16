function SelectCell({ value, column }) {
    const option = column.options?.find(o => o.value === value)
    return <span>{option?.label ?? value ?? ''}</span>
  }
  
  export default SelectCell