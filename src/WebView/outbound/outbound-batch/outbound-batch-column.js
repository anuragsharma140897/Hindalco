import { Text, Radio } from 'rizzui';
import { HeaderCell } from '../../../Component/ui/table';

export const getOutboundBatchColumns = ({ sortConfig, onDeleteItem, onHeaderCellClick, openModal, selectedRow, onRowSelect }) => [
  {
    title: <HeaderCell title="Select" />,
    dataIndex: 'select',
    key: 'select',
    width: 60,
    render: (_, row) => (
      <Radio
        checked={selectedRow === row.id}
        onChange={() => onRowSelect(row.id)}
        className="cursor-pointer"
        size='sm'
      />
    ),
  },
  {
    title: <HeaderCell title="Batch Name" className={'font-extrabold'} />,
    dataIndex: 'batchName',
    key: 'batchName',
    width: 130,
    render: (value) => (
      <Text className="font-medium text-gray-700">{value || '---'}</Text>
    ),
  },
  {
    title: <HeaderCell title="Batch Number" className={'font-extrabold'} />,
    dataIndex: 'batchNumber',
    key: 'batchNumber',
    width: 130,
    render: (value) => (
      <Text className="font-medium text-gray-700">{value || '---'}</Text>
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
    title: <HeaderCell title="TotalInventory" className={'font-extrabold'} />,
    dataIndex: 'totalInventory',
    key: 'totalInventory',
    width: 130,
    render: (value) => (
      <Text className="font-medium text-gray-700">{value === null || value === undefined ? '---' : value}</Text>
    ),
  },
];