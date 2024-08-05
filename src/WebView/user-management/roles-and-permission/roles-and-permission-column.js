import { Badge, Text, Tooltip, ActionIcon } from 'rizzui';
import { HeaderCell } from '../../../Component/ui/table';
import { routes } from '../../../config/routes';
import Permission from '../permission/permission';
import PencilIcon from '../../../Constant/Icons/pencil';
import EyeIcon from '../../../Constant/Icons/eye';
import DeletePopover from '../../../shared/delete-popover';
import React from 'react';

export const getRolesAndPermissionColumns = ({ onDeleteItem }) => [
  {
    title: (
      <HeaderCell title="SR No." />
    ),
    dataIndex: 'index',
    key: 'index',
    width: 10,
    render: (value) => <Text>{value || '---'}</Text>,
  },
  {
    title: <HeaderCell title="Role Name" />,
    dataIndex: 'name',
    key: 'name',
    width: 80,
    render: (value) => (
      <Text className="font-medium text-gray-700">{value || '---'}</Text>
    ),
  },
  {
    title: <HeaderCell title="Permission" />,
    dataIndex: 'permission',
    key: 'permission',
    width: 250,
    render: (permission) => GenerateBadge(permission)
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
        <DeletePopover title={`Delete Role`} description={`Are you sure you want to delete this Role?`}
          onDelete={() => onDeleteItem(row.id)}
        />
      </div>
    ),
  },
];

export const GenerateBadge = (items) => {
  const badgeColors = { read: "bg-yellow-500", write: "bg-green-500", delete: "bg-red-500" };
  const textColors = { read: "text-yellow-500", write: "text-green-500", delete: "text-red-500" };

  return (
    <div className="flex items-center gap-2">
      {items.map((item, index) => {
        const itemKey = Object.keys(item)[0];
        const permissions = item[itemKey];
        return (
          <div key={index} className="flex flex-col border rounded-lg py-1 px-1.5">
            <Text className="capitalize">{itemKey}</Text>
            <div className="flex gap-2">
              {Object.keys(permissions).map((perm) =>
                permissions[perm] ? (
                  <div key={`${itemKey}-${perm}`} className="flex items-center gap-1">
                    <Badge renderAsDot className={badgeColors[perm]} />
                  </div>
                ) : null
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
