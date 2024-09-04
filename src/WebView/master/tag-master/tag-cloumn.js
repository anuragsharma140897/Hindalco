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
    title: <HeaderCell title="_id" className={'font-extrabold'} />,
    dataIndex: '_id',
    key: '_id',
    width: 100,
    render: (value) => (
      <Text className="font-medium text-gray-700">{value || '---'}</Text>
    ),
  },
  {
    title: <HeaderCell title="Identification" className={'font-extrabold'} />,
    dataIndex: 'identification',
    key: 'identification',
    width: 100,
    render: (value) => (
      <Text className="font-medium text-gray-700">{value || '---'}</Text>
    ),
  },
  {
    title: <HeaderCell title="Type Name"  className={'font-extrabold'}/>,
    dataIndex: 'typeName',
    key: 'typeName',
    width: 100,
    render: (value) => (
      <Text className="font-medium text-gray-700">{value || '---'}</Text>
    ),
  },
  {
    title: <HeaderCell title="Type Id"  className={'font-extrabold'}/>,
    dataIndex: 'typeId',
    key: 'typeId',
    width: 100,
    render: (value) => (
      <Text className="font-medium text-gray-700">{value || '---'}</Text>
    ),
  },
  {
    title: <HeaderCell title="Location Name"  className={'font-extrabold'}/>,
    dataIndex: 'locationName',
    key: 'locationName',
    width: 100,
    render: (value) => (
      <Text className="font-medium text-gray-700">{value || '---'}</Text>
    ),
  },
  {
    title: <HeaderCell title="Location ID"  className={'font-extrabold'}/>,
    dataIndex: 'locationId',
    key: 'locationId',
    width: 100,
    render: (value) => (
      <Text className="font-medium text-gray-700">{value || '---'}</Text>
    ),
  },
  {
    title: <HeaderCell title="Tag Number"  className={'font-extrabold'}/>,
    dataIndex: 'tagNo',
    key: 'tagNo',
    width: 100,
    render: (value) => (
      <Text className="font-medium text-gray-700">{value || '---'}</Text>
    ),
  },
  {
    title: <HeaderCell title="Tag Used For Name"  className={'font-extrabold'}/>,
    dataIndex: 'tagUsedForName',
    key: 'tagUsedForName',
    width: 100,
    render: (value) => (
      <Text className="font-medium text-gray-700">{value || '---'}</Text>
    ),
  },
  {
    title: <HeaderCell title="Tag Used For ID"  className={'font-extrabold'}/>,
    dataIndex: 'tagUsedForId',
    key: 'tagUsedForId',
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
            <ActionIcon as="span" size="sm" variant="outline" className="hover:text-gray-700" onClick={()=>EditScreen(openModal, closeModal, row, 'Edit Tag Master' , AddTagMaster, 800)}>
              <PencilIcon className="h-4 w-4" />
            </ActionIcon>
          </label>
        </Tooltip>
        <DeletePopover title={`Delete Tag Master`}  description={`Are you sure you want to delete this employee?`} 
          onDelete={() => DeleteItem(row._id)} 
        />
      </div>
    ),
  },
];


export const DeleteItem = (_id) =>{
  var json = {_id:_id}
  HitApi(json, deleteTag).then((Result)=>{

  })
}