import { Badge, Text, Tooltip, ActionIcon } from 'rizzui';
import { HeaderCell } from '../../../Component/ui/table';
import { routes } from '../../../config/routes';
import Permission from '../permission/permission';
import PencilIcon from '../../../Constant/Icons/pencil';
import DeletePopover from '../../../shared/delete-popover';
import React from 'react';
import { deleteRole } from '../../../Constant/Api/Api';
import { HitApi } from '../../../Store/Action/Api/ApiAction';
import { EditScreen } from '../../../shared/edit-screen';
import AddRolesAndPermission from './add/add-roles-and-permission';
import useAlertController from '../../../Hooks/use-alert-controller';
import { useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import TableActions from '../../../Component/ui/table/TableActions';

export const GetRolesAndPermissionColumns = ({ openModal, closeModal, showCustomAlert, ApiHit }) => {
  const [loadingRows, setLoadingRows] = useState({});

  const handleDelete = async (row) => {
    setLoadingRows((prev) => ({ ...prev, [row.index]: true }));

    const json = { _id: row?._id };

    try {
      const result = await HitApi(json, deleteRole);
      if (result?.success !== false) {
        showCustomAlert({
          type: 'success',
          title: 'Success!',
          message: 'Role Deleted Successfully',
        });
        if (ApiHit) { ApiHit(); }
      } else {
        showCustomAlert({
          type: 'error',
          title: 'Delete Error',
          message: 'Unable to delete this role. This role is already linked with a user.',
        });
      }
    } catch (err) {

    } finally {
      setLoadingRows((prev) => ({ ...prev, [row.index]: false }));
    }
  };

  const renderCell = (value, row, content) => (
    loadingRows[row.index] ? <Skeleton /> : content
  );

  return [
    {
      title: <HeaderCell title="SR No." />,
      dataIndex: 'index',
      key: 'index',
      width: 10,
      render: (value, row) => renderCell(value, row, <Text>{value || '---'}</Text>),
    },
    {
      title: <HeaderCell title="Role Name" />,
      dataIndex: 'roleName',
      key: 'roleName',
      width: 80,
      render: (value, row) => renderCell(value, row, (
        <Text className="font-medium text-gray-700">{value || '---'}</Text>
      )),
    },
    {
      title: <HeaderCell title="Permission" />,
      dataIndex: 'permission',
      key: 'permission',
      width: 250,
      render: (permission, row) => renderCell(permission, row, GenerateBadge(permission))
    },
    {
      title: <HeaderCell title="Actions" className="opacity-0" />,
      dataIndex: 'action',
      key: 'action',
      width: 130,
      render: (_, row) => renderCell(null, row, (
        <TableActions
          screen={'roleAndPermission'}
          row={row}
          onEdit={(rowData) => EditScreen(openModal, closeModal, rowData, 'Edit Site Master', AddRolesAndPermission, 800, ApiHit)}

          onDelete={(rowData) => handleDelete(rowData)}
          checkKeys={[]}
        />
      )),
    },
  ];
};

const GenerateBadge = (items) => {
  const badgeColors = { read: "bg-yellow-buttonYellow", write: "bg-green-buttonGreen", delete: "bg-red-buttonRed" };

  return (
    <div className="flex flex-row gap-4">
      {items.map((item, index) => (
        <div key={index} className="flex flex-col py-1 px-1.5">
          <label className='capitalize'>{item?.value}</label>
          <div className="flex flex-row gap-2">
            {item.permission.map((perm, permIndex) => (
              <div key={permIndex} className="flex flex-col">
                <div className="flex gap-2">
                  {Object.keys(perm).map((key) =>
                    perm[key] ? (
                      <Badge
                        key={`${item.value}-${key}`}
                        renderAsDot
                        className={badgeColors[key]}
                      />
                    ) : null
                  )}
                </div>
                {item.child && item.child.length > 0 && (
                  <div className="pl-4 mt-2">
                    {item.child.map((child, childIndex) => (
                      <div key={childIndex} className="flex flex-col">
                        <label className="capitalize">{child.value}</label>
                        <div className="flex gap-2 my-1">
                          {Object.keys(child.permission[0]).map((key) =>
                            child.permission[0][key] ? (
                              <Badge key={`${child.value}-${key}`} renderAsDot className={badgeColors[key]} />
                            ) : null
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
