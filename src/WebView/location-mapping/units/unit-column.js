import { Badge, Text, Tooltip, ActionIcon } from 'rizzui';
import { HeaderCell } from '../../../Component/ui/table';
import { routes } from '../../../config/routes';
import PencilIcon from '../../../Constant/Icons/pencil';
import EyeIcon from '../../../Constant/Icons/eye';
import DeletePopover from '../../../shared/delete-popover';

export const getUnitsColumns = ({ onDeleteItem }) => [
  {
    title: (
      <HeaderCell title="SR No." />
    ),
    dataIndex: 'index',
    key: 'index',
    width: 120,
    render: (value) => <Text>{value || '---'}</Text>,
  },
  {
    title: <HeaderCell title="Unit Name" />,
    dataIndex: 'unitName',
    key: 'unitName',
    width: 150,
    render: (value) => (
      <Text className="font-medium text-gray-700">{value || '---'}</Text>
    ),
  },
  {
    title: <HeaderCell title="Building" />,
    dataIndex: 'NoOfBuilding',
    key: 'NoOfBuilding',
    width: 150,
    render: (value) => (
      <Text className="font-medium text-gray-700">{value || '---'}</Text>
    ),
  },
  {
    title: <HeaderCell title="Status" />,
    dataIndex: 'status',
    key: 'status',
    width: 150,
    render: (value) => (
      <Text className="font-medium text-gray-700">{value || '---'}</Text>
    ),
  },
  {
    title: <HeaderCell title="Last Active" />,
    dataIndex: 'lastActive',
    key: 'lastActive',
    width: 150,
    render: (value) => (
      <Text className="font-medium text-gray-700">{value || '---'}</Text>
    ),
  },
  {
    title: <HeaderCell title="Actions" className="opacity-0" />,
    dataIndex: 'action',
    key: 'action',
    width: 130,
    render: (_, row) => (
      <div className="flex items-center justify-end gap-3 pe-4">
        <Tooltip size="sm" content={'Edit User'} placement="top" color="invert">
          <label href={routes?.eCommerce?.editOrder(row.id)}>
            <ActionIcon as="span" size="sm" variant="outline" className="hover:text-gray-700">
              <PencilIcon className="h-4 w-4" />
            </ActionIcon>
          </label>
        </Tooltip>
        <Tooltip size="sm" content={'View User'} placement="top" color="invert">
          <label href={routes?.eCommerce?.orderDetails(row.id)}>
            <ActionIcon as="span" size="sm" variant="outline" className="hover:text-gray-700">
              <EyeIcon className="h-4 w-4" />
            </ActionIcon>
          </label>
        </Tooltip>
        <DeletePopover title={`Delete User`}  description={`Are you sure you want to delete this employee?`} 
          onDelete={() => onDeleteItem(row.id)} 
        />
      </div>
    ),
  },
];
