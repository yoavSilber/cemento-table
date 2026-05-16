import { faker } from '@faker-js/faker'
import { CELL_TYPES } from '../Table/constants'

const ROLE_OPTIONS = [
  { value: 'admin', label: 'Admin' },
  { value: 'editor', label: 'Editor' },
  { value: 'viewer', label: 'Viewer' },
  { value: 'manager', label: 'Manager' },
]

const STATUS_OPTIONS = [
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' },
  { value: 'pending', label: 'Pending' },
]

export const columns = [
  { id: 'name',      ordinalNo: 0, title: 'Name',       type: CELL_TYPES.STRING,  width: 180, editable: true },
  { id: 'email',     ordinalNo: 1, title: 'Email',      type: CELL_TYPES.STRING,  width: 220, editable: true },
  { id: 'age',       ordinalNo: 2, title: 'Age',        type: CELL_TYPES.NUMBER,  width: 80,  editable: true },
  { id: 'salary',    ordinalNo: 3, title: 'Salary',     type: CELL_TYPES.NUMBER,  width: 110, editable: true },
  { id: 'active',    ordinalNo: 4, title: 'Active',     type: CELL_TYPES.BOOLEAN, width: 80,  editable: true },
  { id: 'role',      ordinalNo: 5, title: 'Role',       type: CELL_TYPES.SELECT,  width: 120, editable: true, options: ROLE_OPTIONS },
  { id: 'status',    ordinalNo: 6, title: 'Status',     type: CELL_TYPES.SELECT,  width: 120, editable: true, options: STATUS_OPTIONS },
  { id: 'joinedAt',  ordinalNo: 7, title: 'Joined',     type: CELL_TYPES.DATE,    width: 130, editable: true },
  { id: 'id',        ordinalNo: 8, title: 'ID',         type: CELL_TYPES.STRING,  width: 320, editable: false },
]

export function generateData(rowCount = 10000) {
  const data = Array.from({ length: rowCount }, () => {
    const id = faker.string.uuid()
    return {
      id,
      name: faker.person.fullName(),
      email: faker.internet.email(),
      age: faker.number.int({ min: 18, max: 65 }),
      salary: faker.number.int({ min: 30000, max: 150000 }),
      active: faker.datatype.boolean(),
      role: faker.helpers.arrayElement(ROLE_OPTIONS).value,
      status: faker.helpers.arrayElement(STATUS_OPTIONS).value,
      joinedAt: faker.date.past({ years: 5 }).toISOString().split('T')[0],
    }
  })

  return { columns, data }
}
