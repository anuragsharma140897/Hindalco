import { Text, Tooltip, ActionIcon } from 'rizzui';
import { HeaderCell } from '../../../Component/ui/table';
import { routes } from '../../../config/routes';
import DeletePopover from '../../../shared/delete-popover';
import PencilIcon from '../../../Constant/Icons/pencil';
import ProtectIcon from '../../../Constant/Icons/protect';
import SearchUser from '../../../shared/common/search-user';
import { PiInfoFill } from 'react-icons/pi';
import ReaderMasterBuildingInfo from '../../../InfoModal/reader-master-building-info/reader-master-building-info';

export const getCustomerMasterColumns = ({ onDeleteItem, openModal }) => [
  {
    title: <HeaderCell title="#" />,
    dataIndex: 'index',
    key: 'index',
    width: 30,
    render: (value) => <Text>{value || '---'}</Text>,
  },
  {
    title: <HeaderCell title="Customer Name" className={'font-extrabold'} />,
    dataIndex: 'customerName',
    key: 'customerName',
    width: 120,
    render: (value) => (
      <Text className="font-medium text-gray-700">{value || '---'}</Text>
    ),
  },
  {
    title: <HeaderCell title="Customer Code" className={'font-extrabold'} />,
    dataIndex: 'customerCode',
    key: 'customerCode',
    width: 150,
    render: (value) => (
      <Text className="font-medium text-gray-700">{value || '---'}</Text>
    ),
  }, {
    title: <HeaderCell title="Customer GST" className={'font-extrabold'} />,
    dataIndex: 'customerGST',
    key: 'customerGST',
    width: 150,
    render: (value) => (
      <Text className="font-medium text-gray-700">{value || '---'}</Text>
    ),
  }, {
    title: <HeaderCell title="Customer Address" className={'font-extrabold'} />,
    dataIndex: 'customerAddress',
    key: 'customerAddress',
    width: 150,
    render: (value) => (
      <Text className="font-medium text-gray-700">{value || '---'}</Text>
    ),
  },
  {
    title: <HeaderCell title="Customer PAN" className={'font-extrabold'} />,
    dataIndex: 'customerPAN',
    key: 'customerPAN',
    width: 20,
    render: (value) => (
      <Text className="font-medium text-gray-700">{value || '---'}</Text>
    ),
  }, {
    title: <HeaderCell title="Customer Status" className={'font-extrabold'} />,
    dataIndex: 'customerStatus',
    key: 'customerStatus',
    width: 150,
    render: (value) => (
      <Text className="font-medium text-gray-700">{value || '---'}</Text>
    ),
  },
  {
    title: <HeaderCell title="Actions" className={'font-extrabold'} />,
    dataIndex: 'action',
    key: 'action',
    width: 130,
    render: (_, row) => (
      <div className="flex items-center gap-3 pe-4">
        <Tooltip size="sm" content={'Edit User'} placement="top" color="invert">
          <label href={routes?.eCommerce?.editOrder(row.id)}>
            <ActionIcon as="span" size="sm" variant="outline" className="hover:text-gray-700">
              <PencilIcon className="h-4 w-4" />
            </ActionIcon>
          </label>
        </Tooltip>
        <DeletePopover title={`Delete User`} description={`Are you sure you want to delete this employee?`}
          onDelete={() => onDeleteItem(row.id)}
        />
        <Tooltip size="sm" content={'Search User'} placement="top" color="invert">
          <label href={routes?.eCommerce?.editOrder(row.id)}>
            <ActionIcon as="span" size="sm" variant="outline" className="hover:text-gray-700" onClick={() => openModal({ view: <SearchUser /> })}>
              <ProtectIcon className="h-4 w-4" />
            </ActionIcon>
          </label>
        </Tooltip>
      </div>
    ),
  },
];
