import { Text, Tooltip, ActionIcon } from 'rizzui';
import { HeaderCell } from '../../../Component/ui/table';
import DeletePopover from '../../../shared/delete-popover';
import PencilIcon from '../../../Constant/Icons/pencil';
import AddSiteMaster from '../../../Form/master/site-master/add-site-master';
import {EditScreen} from '../../../shared/edit-screen';
import { HitApi } from '../../../Store/Action/Api/ApiAction';
import { deleteGeneral, deleteSite, deleteVehicle } from '../../../Constant/Api/Api';
import AddGeneralMaster from '../../../Form/master/general-master/add-general-master';
import AddVehicleMaster from '../../../Form/master/vehicle-master/add-vehcile-master';

export const getVehicleMasterColumns = ({ openModal, closeModal ,loading,setLoading}) => [
    
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
    title: <HeaderCell title="Vehicle Maker" className={'font-extrabold'} />,
    dataIndex: 'vehicleMaker',
    key: 'vehicleMaker',
    width: 100,
    render: (value) => (
      <Text className="font-medium text-gray-700">{value || '---'}</Text>
    ),
  },
  {
    title: <HeaderCell title="Vehicle Number" className={'font-extrabold'} />,
    dataIndex: 'vehicleNumber',
    key: 'vehicleNumber',
    width: 100,
    render: (value) => (
      <Text className="font-medium text-gray-700">{value || '---'}</Text>
    ),
  },
  {
    title: <HeaderCell title="Vehicle Model"  className={'font-extrabold'}/>,
    dataIndex: 'vehicleModel',
    key: 'vehicleModel',
    width: 100,
    render: (value) => (
      <Text className="font-medium text-gray-700">{value || '---'}</Text>
    ),
  },
  {
    title: <HeaderCell title="Vehicle Year"  className={'font-extrabold'}/>,
    dataIndex: 'vehicleYear',
    key: 'vehicleYear',
    width: 100,
    render: (value) => (
      <Text className="font-medium text-gray-700">{value || '---'}</Text>
    ),
  },
  {
    title: <HeaderCell title="Vehicle Engine"  className={'font-extrabold'}/>,
    dataIndex: 'vehicleEngine',
    key: 'vehicleEngine',
    width: 100,
    render: (value) => (
      <Text className="font-medium text-gray-700">{value || '---'}</Text>
    ),
  },
  {
    title: <HeaderCell title="Vehicle Type"  className={'font-extrabold'}/>,
    dataIndex: 'vehicleType',
    key: 'vehicleType',
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
        <Tooltip size="sm" content={'Edit Vehicle Master'} placement="top" color="invert">
          <label>
            <ActionIcon as="span" size="sm" variant="outline" className="hover:text-gray-700" onClick={()=>EditScreen(openModal, closeModal, row, 'Edit Vehicle Master' , AddVehicleMaster, 800)}>
              <PencilIcon className="h-4 w-4" />
            </ActionIcon>
          </label>
        </Tooltip>
        <DeletePopover loading={loading} title={`Delete Vehicle Master`}  description={`Are you sure you want to delete this employee?`} 
          onDelete={() => DeleteItem(row._id,setLoading)} 
        />
      </div>
    ),
  },
];



const DeleteItem = async (_id, setLoading) => {
  setLoading(true);
  try {
    const json = { _id };
    const result = await HitApi(json, deleteVehicle);

    if (result.status === 200) {
      alert(result.message);
      window.location.pathname = '/master/vehicle';
    } else {
      alert(result.message);
    }
  } catch (error) {
    console.error("Error deleting item:", error);
    alert("An error occurred while deleting the item.");
  } finally {
    setLoading(false);
  }
};