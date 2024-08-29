import { ActionIcon, Text, Tooltip } from 'rizzui';
import { HeaderCell } from '../../../Component/ui/table';
import PencilIcon from '../../../Constant/Icons/pencil';
import { routes } from '../../../config/routes';
import SearchUser from '../../../shared/common/search-user';
import EyeIcon from '../../../Constant/Icons/eye';

export const getOutboundOrderColumn = ({ sortConfig, onDeleteItem, onHeaderCellClick, openModal }) => [
  {
    title: <HeaderCell title="#" />,
    dataIndex: 'index',
    key: 'index',
    width: 20,
    render: (value) => <Text>{value || '---'}</Text>,
  },
  {
    title: <HeaderCell title="Dispatch From" className={'font-extrabold'} />,
    dataIndex: 'dispatchFromName',
    key: 'dispatchFromName',
    width: 130,
    render: (value) => (
      <Text className="font-medium text-gray-700">{value || '---'}</Text>
    ),
  },
  {
    title: <HeaderCell title="Dispatch To" className={'font-extrabold'} />,
    dataIndex: 'dispatchToName',
    key: 'dispatchToName',
    width: 130,
    render: (value) => (
      <Text className="font-medium text-gray-700">{value || '---'}</Text>
    ),
  },
  {
    title: <HeaderCell title="Bill To" className={'font-extrabold'} />,
    dataIndex: 'billToName',
    key: 'billToName',
    width: 130,
    render: (value) => (
      <Text className="font-medium text-gray-700">{value || '---'}</Text>
    ),
  },
  {
    title: <HeaderCell title="Expected Arrival" className={'font-extrabold'} />,
    dataIndex: 'expectedArrival',
    key: 'expectedArrival',
    width: 120,
    render: (value) => (
      <Text className="font-medium text-gray-700">
        {value ? new Date(value).toLocaleString() : '---'}
      </Text>
    ),
  },
  {
    title: <HeaderCell title="Order DateTime" className={'font-extrabold'} />,
    dataIndex: 'orderDateTime',
    key: 'orderDateTime',
    width: 120,
    render: (value) => (
      <Text className="font-medium text-gray-700">
        {value ? new Date(value).toLocaleString() : '---'}
      </Text>
    ),
  },
  {
    title: <HeaderCell title="Order Status" className={'font-extrabold'} />,
    dataIndex: 'orderStatus',
    key: 'orderStatus',
    width: 120,
    render: (value) => (
      <Text className="font-medium text-gray-700">{value || '---'}</Text>
    ),
  },
  {
    title: <HeaderCell title="Sale Type" className={'font-extrabold'} />,
    dataIndex: 'saleType',
    key: 'saleType',
    width: 120,
    render: (value) => (
      <Text className="font-medium text-gray-700">{value || '---'}</Text>
    ),
  },
  {
    title: <HeaderCell title="Actions" className={'font-extrabold'} />,
    dataIndex: 'action',
    key: 'action',
    width: 120,
    render: (_, row) => (
      <div className="flex items-center gap-3 pe-4">
        <Tooltip size="sm" content={'Edit'} placement="top" color="invert">
          {
            <a href={'/outbond/outbound-edit/' + row._id}>
              <ActionIcon as="span" size="sm" variant="outline" className="hover:text-gray-700">
                <PencilIcon className="h-4 w-4" />
              </ActionIcon>
            </a>
          }
        </Tooltip>
        
        <Tooltip size="sm" content={'View'} placement="top" color="invert">
          <label href={routes?.eCommerce?.editOrder(row.id)}>
            <ActionIcon as="span" size="sm" variant="outline" className="hover:text-gray-700" onClick={() => openModal({ view: <SearchUser /> })}>
              <EyeIcon className="w-5 h-5" />
            </ActionIcon>
          </label>
        </Tooltip>
      </div>
    ),
  },
];