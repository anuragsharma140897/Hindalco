import { Text, Checkbox } from 'rizzui';
import { HeaderCell } from '../../../Component/ui/table';

export const getOutboundIgoneBatchColumns = ({ sortConfig, onDeleteItem, onHeaderCellClick, openModal, selectedRows, onRowSelect }) => [
  {
    title: <HeaderCell title="Select" />,
    dataIndex: 'select',
    key: 'select',
    width: 60,
    render: (_, row) => (
      <Checkbox
        checked={selectedRows.some(selectedRow => selectedRow.id === row.id)}
        onChange={() => onRowSelect(row)}
        className="cursor-pointer"
        size='sm'
      />
    ),
},
  {
    title: <HeaderCell title="Movement Status" className={'font-extrabold'} />,
    dataIndex: 'movementStatus',
    key: 'movementStatus',
    width: 130,
    render: (value) => (
      <Text className="font-medium text-gray-700">{value || '---'}</Text>
    ),
  },
  {
    title: <HeaderCell title="Rfid Tag" className={'font-extrabold'} />,
    dataIndex: 'rfidTag',
    key: 'rfidTag',
    width: 130,
    render: (value) => (
      <Text className="font-medium text-gray-700">{value || '---'}</Text>
    ),
  },
  {
    title: <HeaderCell title="Status" className={'font-extrabold'} />,
    dataIndex: 'status',
    key: 'status',
    width: 130,
    render: (value) => (
      <Text className="font-medium text-gray-700">{value || '---'}</Text>
    ),
  },
];