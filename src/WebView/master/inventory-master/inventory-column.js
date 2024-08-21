import { Text, Tooltip, ActionIcon } from 'rizzui';
import { HeaderCell } from '../../../Component/ui/table';
import DeletePopover from '../../../shared/delete-popover';
import PencilIcon from '../../../Constant/Icons/pencil';
import AddSiteMaster from '../../../Form/master/site-master/add-site-master';
import { EditScreen } from '../../../shared/edit-screen';
import { HitApi } from '../../../Store/Action/Api/ApiAction';
import { deleteGeneral, deleteSite, deleteZone } from '../../../Constant/Api/Api';
import { HiOutlinePlusCircle } from "react-icons/hi";
import AddZoneMaster from '../../../Form/master/zone-master/add-zone-master';
import AddZoneBuilding from '../../../Form/master/zone-master/add-zone-building';
import AddInventoryMaster from '../../../Form/master/inventory-master/add-inventory-master';

export const getInventoryMasterColumns = ({ openModal, closeModal, loading, setLoading }) => [

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
    title: <HeaderCell title="Product Name" className={'font-extrabold'} />,
    dataIndex: 'product_id',
    key: 'product_id',
    width: 100,
    render: (value) => (
        <Text className="font-medium text-gray-700">{value?.productName || '---'}</Text>
      ),
  },
  {
    title: <HeaderCell title="Batch Name" className={'font-extrabold'} />,
    dataIndex: 'batchName',
    key: 'batchName',
    width: 100,
    render: (value) => (
      <Text className="font-medium text-gray-700">{value || '---'}</Text>
    ),
  },
  
  {
    title: <HeaderCell title="Batch Number" className={'font-extrabold'} />,
    dataIndex: 'batchNumber',
    key: 'batchNumber',
    width: 100,
    render: (value) => (
      <Text className="font-medium text-gray-700">{value || '---'}</Text>
    ),
  },
  {
    title: <HeaderCell title="Batch Number" className={'font-extrabold'} />,
    dataIndex: 'batchNumber',
    key: 'batchNumber',
    width: 100,
    render: (value) => (
      <Text className="font-medium text-gray-700">{value || '---'}</Text>
    ),
  },
  {
    title: <HeaderCell title="Movement Status" className={'font-extrabold'} />,
    dataIndex: 'movementStatus',
    key: 'movementStatus',
    width: 100,
    render: (value) => (
      <Text className="font-medium text-gray-700">{value || '---'}</Text>
    ),
  },
  {
    title: <HeaderCell title="Status" className={'font-extrabold'} />,
    dataIndex: 'status',
    key: 'status',
    width: 100,
    render: (value) => (
      <Text className="font-medium text-gray-700">{value || '---'}</Text>
    ),
  },
  {
    title: <HeaderCell title="Actions" className={'font-extrabold'} />,
    dataIndex: 'action',
    key: 'action',
    width: 600,
    render: (_, row) => (


      <div className="flex items-center gap-3 pe-4">
        {console.log("row+++++++++++++", row)}
        <Tooltip size="sm" content={'Edit Inventory Master'} placement="top" color="invert">
          <label>
            <ActionIcon as="span" size="sm" variant="outline" className="hover:text-gray-700" onClick={() => EditScreen(openModal, closeModal, row, 'Edit Inventory Master', AddInventoryMaster, 400)}>
              <PencilIcon className="h-4 w-4" />
            </ActionIcon>
          </label>
        </Tooltip>
        {(row?.usedBy === null || (Array.isArray(row?.usedBy) && row.usedBy.length === 0)) ? (
          <DeletePopover
            loading={loading}
            title={`Delete Zone Master`}
            description={`Are you sure you want to delete?`}
            onDelete={() => DeleteItem(row.id, setLoading)}
          />
        ) : (
          <DeletePopover
          loading={loading}
          title={`You cannot delete zone`}
          description={`This zone is already assigned`}
          onDelete={() => DeleteItem(row.id, setLoading)}
          disable={true}
        />
        )}

        <Tooltip size="sm" content={'Add Building'} placement="top" color="invert">
          <label>
            <ActionIcon as="span" size="sm" variant="outline" className="hover:text-gray-700" onClick={() => EditScreen(openModal, closeModal, row, 'Add Building', AddZoneBuilding, 800)}>
              <HiOutlinePlusCircle size={20} />
            </ActionIcon>
          </label>
        </Tooltip>
      </div>
    ),
  },
];


const DeleteItem = async (id, setLoading) => {
  setLoading(true);
  try {
    const json = { id };
    const result = await HitApi(json, deleteZone);

    if (result.status === 200) {
      alert(result.message);
      window.location.pathname = '/master/zone';
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