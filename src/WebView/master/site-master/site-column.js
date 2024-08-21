import { Text, Tooltip, ActionIcon } from 'rizzui';
import { HeaderCell } from '../../../Component/ui/table';
import DeletePopover from '../../../shared/delete-popover';
import PencilIcon from '../../../Constant/Icons/pencil';
import AddSiteMaster from '../../../Form/master/site-master/add-site-master';
import { EditScreen } from '../../../shared/edit-screen';
import { HitApi } from '../../../Store/Action/Api/ApiAction';
import { deleteSite, searchBuilding } from '../../../Constant/Api/Api';
import { getFormattedDate } from '../../../Utils/Utils';

export const getSiteMasterColumns = (openModal, closeModal, ApiHit, showCustomAlert) => [
  {
    title: (
      <HeaderCell title="#" />
    ),
    dataIndex: 'index',
    key: 'index',
    width: 10,
    render: (value, row, index) => <Text>{index + 1 || '---'}</Text>,
  },
  {
    title: <HeaderCell title="Site Name" className={'font-extrabold'} />,
    dataIndex: 'siteName',
    key: 'siteName',
    width: 100,
    render: (value) => (
      <Text className="font-medium text-gray-700">{value || '---'}</Text>
    ),
  },
  {
    title: <HeaderCell title="Building" className={'font-extrabold'} />,
    dataIndex: 'buildings',
    key: 'buildings',
    width: 100,
    render: (value) => (
      <Text className="font-medium text-gray-700">{value || '---'}</Text>
    ),
  },
  {
    title: <HeaderCell title="Area" className={'font-extrabold'} />,
    dataIndex: 'area',
    key: 'area',
    width: 100,
    render: (value) => (
      <Text className="font-medium text-gray-700">{value || '---'}</Text>
    ),
  }, {
    title: <HeaderCell title="Created By" className={'font-extrabold'} />,
    dataIndex: 'createdBy',
    key: 'createdBy',
    width: 100,
    render: (value) => (
      <Text className="font-medium text-gray-700">{value || '---'}</Text>
    ),
  }, {
    title: <HeaderCell title="Creation Date" className={'font-extrabold'} />,
    dataIndex: 'createdAt',
    key: 'createdAt',
    width: 150,
    render: (value) => (
      <Text className="font-medium text-gray-700">{getFormattedDate(value, ['date', 'month', 'year', 'hour', 'minute', 'second']) || '---'}</Text>
    ),
  },
  , {
    title: <HeaderCell title="Updation Date" className={'font-extrabold'} />,
    dataIndex: 'updatedAt',
    key: 'updatedAt',
    width: 150,
    render: (value) => (
      <Text className="font-medium text-gray-700">{getFormattedDate(value, ['date', 'month', 'year', 'hour', 'minute', 'second']) || '---'}</Text>
    ),
  },
  {
    title: <HeaderCell title="Actions" className={'font-extrabold'} />,
    dataIndex: 'action',
    key: 'action',
    width: 300,
    render: (_, row) => (
      <div className="flex items-center gap-3 pe-4">
        <Tooltip size="sm" content={'Edit Site Master'} placement="top" color="invert">
          <label>
            <ActionIcon as="span" size="sm" variant="outline" className="hover:text-gray-700" onClick={() => EditScreen(openModal, closeModal, row, 'Edit Site Master', AddSiteMaster, 400, ApiHit)}>
              <PencilIcon className="h-4 w-4" />
            </ActionIcon>
          </label>
        </Tooltip>
        <DeletePopover title={`Delete Site Master`} description={`Are you sure you want to delete this employee?`}
          onDelete={() => DeleteItem(row.id, showCustomAlert, ApiHit)}
        />
      </div>
    ),
  },
];


export const DeleteItem = (id, showCustomAlert, ApiHit) => {
  var json = { page: 1, limit: 1, search: { unitId: id } }
  HitApi(json, searchBuilding).then((result) => {

    if (result?.success !== false) {
      if (result?.content?.length > 0) {
        showCustomAlert({
          type: 'error',
          title: "Delete Error",
          message: "Unable to delete this Site, This Site is already linked with the Building",
        })
      }
    } else {
      var json = { id: id }
      HitApi(json, deleteSite).then((res) => {
        if (res?.success !== false) {
          showCustomAlert({
            type: 'success',
            title: "Delete Success",
            message: "The Site has been deleted successfully",
          })

          ApiHit()
        }
      })
    }
  }).catch(err => {
    ApiHit()
    console.log('Unexpected error:', err);
  })


}