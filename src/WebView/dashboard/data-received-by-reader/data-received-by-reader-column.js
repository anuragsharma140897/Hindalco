import { Text } from 'rizzui';
import Skeleton from 'react-loading-skeleton';
import { HeaderCell } from '../../../Component/ui/table';

export const GetMqttReaderColumns = () => {

return [
  {
    title: (
      <HeaderCell title="SR. No" />
    ),
    dataIndex: 'index',
    key: 'index',
    width: 120,
    render: (value) => <Text className="font-medium text-gray-700">{value || '---'}</Text>,
  },
  {
    title: (
      <HeaderCell title="ID" />
    ),
    dataIndex: 'data',
    key: 'data',
    width: 120,
    render: (value) => <Text className="font-medium text-gray-700">{value?.idHex || '---'}</Text>,
  },
  {
    title: <HeaderCell title="Date/Time" />,
    dataIndex: 'timestamp',
    key: 'timestamp',
    width: 150,
    render: (value, row) => <Text className="font-medium text-gray-700">{value || '---'}</Text>,
  },
]
}
