import { Text } from "rizzui"
import { HeaderCell } from "../../../../Component/ui/table"

export const GetDashboardInentoryColumns = () => {

  return [
    {
      title: (
        <HeaderCell title="SR No." />
      ),
      dataIndex: 'index',
      key: 'index',
      width: 120,
      render: (value) => <Text className="font-medium text-gray-700">{value || '---'}</Text>,
    },
    {
      title: <HeaderCell title="Batch No." />,
      dataIndex: 'batchNumber',
      key: 'batchNumber',
      width: 150,
      render: (value, row) => <Text className="font-medium text-gray-700">{value || '---'}</Text>,
    },
    {
      title: <HeaderCell title="Lot No." />,
      dataIndex: 'lotNumber',
      key: 'lotNumber',
      width: 150,
      render: (value, row) => <Text className="font-medium text-gray-700">{value || '---'}</Text>
    },
    {
      title: <HeaderCell title="Role" />,
      dataIndex: 'roleName',
      key: 'roleName',
      width: 150,
      render: (value) => (
        <Text className="font-medium text-gray-700">{value || '---'}</Text>
      ),
    },
    {
      title: <HeaderCell title="Status" />,
      dataIndex: 'movementStatus',
      key: 'movementStatus',
      width: 150,
      render: (value) => (
        <Text className="font-medium text-gray-700">{value || '---'}</Text>
      ),
    },
    {
      title: <HeaderCell title="Message" />,
      dataIndex: 'error',
      key: 'error',
      width: 150,
      render: (value, row) => (
        <Text className="font-medium text-gray-700">{row?.error && row?.errorMsg}</Text>
      ),
    },
  ]
}
