import { Badge, Text, Tooltip, ActionIcon, Loader } from 'rizzui';
import { HeaderCell } from '../../../Component/ui/table';
import { routes } from '../../../config/routes';
import Permission from '../permission/permission';
import PencilIcon from '../../../Constant/Icons/pencil';
import EyeIcon from '../../../Constant/Icons/eye';
import DeletePopover from '../../../shared/delete-popover';
import { deleteUser } from '../../../Constant/Api/Api';
import { HitApi } from '../../../Store/Action/Api/ApiAction';
import { EditScreen } from '../../../shared/edit-screen';
import AddUserMaster from '../../../Form/master/user-master/add-user-master';
import Skeleton from 'react-loading-skeleton';

export const getUserColumns = (openModal, closeModal, ApiHit) => {



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
    title: <HeaderCell title="Name" />,
    dataIndex: 'firstName',
    key: 'firstName',
    width: 150,
    render: (value, row) => {
      return (
        row.loading ? <Skeleton /> : <div>
          <Text className="font-semibold text-gray-700">{row?.firstName + ' ' + row?.lastName}</Text>
          <Text className="text-xs font-medium text-gray-700">{row?.username}</Text>
        </div>
      )
    },
  },
  {
    title: <HeaderCell title="Gender" />,
    dataIndex: 'gender',
    key: 'gender',
    width: 150,
    render: (value, row) => {
      return (
        row.loading ?  <Loader variant="spinner" size="xl" /> : <div>
          <Text className="font-medium text-gray-700">{value || '---'}</Text>
        </div>
      )
    },
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
    title: <HeaderCell title="Permission" />,
    dataIndex: 'permission',
    key: 'permission',
    width: 150,
    render: (value) => (
      <>
        <Text className="font-medium text-gray-700"><span className='cursor-pointer' onClick={() => openModal({ view: <Permission /> })}>View</span></Text>
      </>
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
          <label>
            <ActionIcon as="span" size="sm" variant="outline" className="hover:text-gray-700" onClick={() => EditScreen(openModal, closeModal, row, 'Edit Site Master', AddUserMaster, 800, ApiHit)}>
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
        <DeletePopover title={`Delete User`} description={`Are you sure you want to delete this employee?`}
          onDelete={() => DeleteItem(row.id)}
        />
      </div>
    ),
  },
]
}


export const DeleteItem = (id) => {
  var json = { id: id }
  HitApi(json, deleteUser).then((Result) => {

  })
}