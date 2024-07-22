import { Text, Tooltip, ActionIcon } from 'rizzui';
import { HeaderCell } from '../../../Component/ui/table';
import { routes } from '../../../config/routes';
import DeletePopover from '../../../shared/delete-popover';
import PencilIcon from '../../../Constant/Icons/pencil';
import ProtectIcon from '../../../Constant/Icons/protect';
import SearchUser from '../../../shared/common/search-user';
import { PiInfoFill } from 'react-icons/pi';
import ReaderMasterBuildingInfo from '../../../InfoModal/reader-master-building-info/reader-master-building-info';

export const getProductMasterColumns = ({ onDeleteItem, openModal }) => [
  {
    title: <HeaderCell title="#" />,
    dataIndex: 'index',
    key: 'index',
    width: 30,
    render: (value) => <Text>{value || '---'}</Text>,
  },
  {
    title: <HeaderCell title="Product Name" className={'font-extrabold'} />,
    dataIndex: 'productName',
    key: 'productName',
    width: 120,
    render: (value) => (
      <Text className="font-medium text-gray-700">{value || '---'}</Text>
    ),
  },
  {
    title: <HeaderCell title="Product Description" className={'font-extrabold'} />,
    dataIndex: 'productDescription',
    key: 'productDescription',
    width: 150,
    render: (value) => (
      <Text className="font-medium text-gray-700">{value || '---'}</Text>
    ),
  }, {
    title: <HeaderCell title="Product Group" className={'font-extrabold'} />,
    dataIndex: 'productGroup',
    key: 'productGroup',
    width: 150,
    render: (value) => (
      <Text className="font-medium text-gray-700">{value || '---'}</Text>
    ),
  }, {
    title: <HeaderCell title="Selling Cost" className={'font-extrabold'} />,
    dataIndex: 'sellingCost',
    key: 'sellingCost',
    width: 150,
    render: (value) => (
      <Text className="font-medium text-gray-700">{value || '---'}</Text>
    ),
  },
  {
    title: <HeaderCell title="Weight" className={'font-extrabold'} />,
    dataIndex: 'weight',
    key: 'weight',
    width: 20,
    render: (value) => (
      <Text className="font-medium text-gray-700">{value || '---'}</Text>
    ),
  }, {
    title: <HeaderCell title="Grade" className={'font-extrabold'} />,
    dataIndex: 'grade',
    key: 'grade',
    width: 150,
    render: (value) => (
      <Text className="font-medium text-gray-700">{value || '---'}</Text>
    ),
  }, {
    title: <HeaderCell title="Batch" className={'font-extrabold'} />,
    dataIndex: 'batch',
    key: 'batch',
    width: 150,
    render: (value) => (
      <Text className="font-medium text-gray-700">{value || '---'}</Text>
    ),
  }, {
    title: <HeaderCell title="Lot" className={'font-extrabold'} />,
    dataIndex: 'lot',
    key: 'lot',
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
