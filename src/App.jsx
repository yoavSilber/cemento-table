import { generateData } from './mock/generateData'
import Table from './Table/Table'
import './index.css'

const { columns, data } = generateData(10000)

function App() {
  return (
    <div className="app">
      <Table columns={columns} data={data} />
    </div>
  )
}

export default App