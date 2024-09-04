import { Badge, Text, Tooltip, ActionIcon } from 'rizzui';
import { HeaderCell } from '../../../Component/ui/table';
import { routes } from '../../../config/routes';
import Permission from '../permission/permission';
import PencilIcon from '../../../Constant/Icons/pencil';
import DeletePopover from '../../../shared/delete-popover';
import React from 'react';
import { deleteRole, searchUser } from '../../../Constant/Api/Api';
import { HitApi } from '../../../Store/Action/Api/ApiAction';
import { EditScreen } from '../../../shared/edit-screen';
import AddRolesAndPermission from './add/add-roles-and-permission';

export const getRolesAndPermissionColumns = ({ openModal, closeModal, showCustomAlert }) => [
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
    dataIndex: 'roleName',
    key: 'roleName',
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
        <Tooltip size="sm" content={'Check Users'} placement="top" color="invert">
          <label>
            <ActionIcon as="span" size="sm" variant="outline" className="hover:text-gray-700">
              <PencilIcon className="h-4 w-4" />
            </ActionIcon>
          </label>
        </Tooltip>
        <Tooltip size="sm" content={'Edit Site Master'} placement="top" color="invert">
          <label>
            <ActionIcon as="span" size="sm" variant="outline" className="hover:text-gray-700" onClick={()=>EditScreen(openModal, closeModal, row, 'Edit Roles And Permission' , AddRolesAndPermission, 800)}>
              <PencilIcon className="h-4 w-4" />
            </ActionIcon>
          </label>
        </Tooltip>
        <DeletePopover title={`Delete Role`} description={`Are you sure you want to delete this Role?`}
          onDelete={() => DeleteItem(row._id, showCustomAlert)}
        />
      </div>
    ),
  },

];

export const GenerateBadge = (items) => {
  const badgeColors = { read: "bg-yellow-buttonYellow", write: "bg-green-buttonGreen", delete: "bg-red-buttonRed" };

  return (
    <div className="flex flex-row gap-4">
      {items.map((item, index) => {
        return (
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
                              <Badge key={`${child.value}-${key}`} renderAsDot className={badgeColors[key]}/>
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
        )
      })}
    </div>
  );
};


export const DeleteItem = (_id, showCustomAlert) => {
  // var json = { page:1, limit : 1, search : {roleId: _id} }
  var json = {_id:_id}
  HitApi(json, deleteRole).then((Result)=>{
    if(Result?.content?.length>0){
      showCustomAlert({
        type : 'error',
        title : "Delete Error",
        message : "Unable to delete this role, This role is already linked with the User"
      })


    }
  }).catch(err=>{

  })
  
  // HitApi(json, deleteRole).then((Result) => {

  // })
}