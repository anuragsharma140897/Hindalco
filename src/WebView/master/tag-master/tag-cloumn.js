import { Text, Tooltip, ActionIcon } from 'rizzui';
import { HeaderCell } from '../../../Component/ui/table';
import DeletePopover from '../../../shared/delete-popover';
import PencilIcon from '../../../Constant/Icons/pencil';
import AddSiteMaster from '../../../Form/master/site-master/add-site-master';
import {EditScreen} from '../../../shared/edit-screen';
import { HitApi } from '../../../Store/Action/Api/ApiAction';
import { deleteGeneral, deleteLocation, deleteSite, deleteTag, deleteVehicle } from '../../../Constant/Api/Api';
import AddVehicleMaster from '../../../Form/master/vehicle-master/add-vehcile-master';
import AddLocationMaster from '../../../Form/master/location-master/add-location-master';
import AddTagMaster from '../../../Form/master/tag-master/add-tag-master';

export const getTagMasterColumns = ({ openModal, closeModal }) => [
    
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
    title: <HeaderCell title="id" className={'font-extrabold'} />,
    dataIndex: 'id',
    key: 'id',
    width: 100,
    render: (value) => (
      <Text className="font-medium text-gray-700">{value || '---'}</Text>
    ),
  },
  {
    title: <HeaderCell title="Tag Number" className={'font-extrabold'} />,
    dataIndex: 'tagNumber',
    key: 'tagNumber',
    width: 100,
    render: (value) => (
      <Text className="font-medium text-gray-700">{value || '---'}</Text>
    ),
  },
  {
    title: <HeaderCell title="Tag Placement"  className={'font-extrabold'}/>,
    dataIndex: 'tagPlacement',
    key: 'tagPlacement',
    width: 100,
    render: (value) => (
      <Text className="font-medium text-gray-700">{value || '---'}</Text>
    ),
  },
  {
    title: <HeaderCell title="Tag Used For"  className={'font-extrabold'}/>,
    dataIndex: 'tagUsedFor',
    key: 'tagUsedFor',
    width: 100,
    render: (value) => (
      <Text className="font-medium text-gray-700">{value || '---'}</Text>
    ),
  },
  {
    title: <HeaderCell title="Status"  className={'font-extrabold'}/>,
    dataIndex: 'status',
    key: 'status',
    width: 100,
    render: (value) => (
      <Text className="font-medium text-gray-700">{value || '---'}</Text>
    ),
  },
  {
    title: <HeaderCell title="Actions" className={'font-extrabold'}/>,
    dataIndex: 'action',
    key: 'action',
    width: 600,
    render: (_, row) => (
      <div className="flex items-center gap-3 pe-4">
        <Tooltip size="sm" content={'Edit Tag Master'} placement="top" color="invert">
          <label>
            <ActionIcon as="span" size="sm" variant="outline" className="hover:text-gray-700" onClick={()=>EditScreen(openModal, closeModal, row, 'Edit Tag Master' , AddTagMaster, 500)}>
              <PencilIcon className="h-4 w-4" />
            </ActionIcon>
          </label>
        </Tooltip>
        <DeletePopover title={`Delete Tag Master`}  description={`Are you sure you want to delete this employee?`} 
          onDelete={() => DeleteItem(row.id)} 
        />
      </div>
    ),
  },
];


export const DeleteItem = (id) =>{
  var json = {id:id}
  HitApi(json, deleteTag).then((Result)=>{
    console.log('Result', Result);
  })
}