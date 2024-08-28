import { Text, Tooltip, ActionIcon } from 'rizzui';
import { HeaderCell } from '../../../Component/ui/table';
import { routes } from '../../../config/routes';
import DeletePopover from '../../../shared/delete-popover';
import PencilIcon from '../../../Constant/Icons/pencil';
import { deleteSupplier } from '../../../Constant/Api/Api';
import { HitApi } from '../../../Store/Action/Api/ApiAction';
import AddSupplierMaster from '../../../Form/master/supplier-master/add-supplier-master';
import { EditScreen } from '../../../shared/edit-screen';

export const getSupplierMasterColumns = ({openModal, closeModal, loading, setLoading  }) => [
  {
    title: <HeaderCell title="#" />,
    dataIndex: 'index',
    key: 'index',
    width: 30,
    render: (value) => <Text>{value || '---'}</Text>,
  },
  {
    title: <HeaderCell title="Supplier Name" className={'font-extrabold'} />,
    dataIndex: 'supplierName',
    key: 'supplierName',
    width: 150,
    render: (value) => (
      <Text className="font-medium text-gray-700">{value || '---'}</Text>
    ),
  }, {
    title: <HeaderCell title="Supplier Code" className={'font-extrabold'} />,
    dataIndex: 'supplierCode',
    key: 'supplierCode',
    width: 150,
    render: (value) => (
      <Text className="font-medium text-gray-700">{value || '---'}</Text>
    ),
  },
  {
    title: <HeaderCell title="Supplier Group" className={'font-extrabold'} />,
    dataIndex: 'supplierGroup',
    key: 'supplierGroup',
    width: 150,
    render: (value) => (
      <Text className="font-medium text-gray-700">{value || '---'}</Text>
    ),
  },
  {
    title: <HeaderCell title="Supplier Email" className={'font-extrabold'} />,
    dataIndex: 'supplierContactEmail',
    key: 'supplierContactEmail',
    width: 150,
    render: (value) => (
      <Text className="font-medium text-gray-700">{value || '---'}</Text>
    ),
  },
  {
    title: <HeaderCell title="Supplier Type" className={'font-extrabold'} />,
    dataIndex: 'supplierType',
    key: 'supplierType',
    width: 150,
    render: (value) => (
      <Text className="font-medium text-gray-700">{value || '---'}</Text>
    ),
  },
  {
    title: <HeaderCell title="Supplier Address1" className={'font-extrabold'} />,
    dataIndex: 'supplierAddress1',
    key: 'supplierAddress1',
    width: 20,
    render: (value) => (
      <Text className="font-medium text-gray-700">{value || '---'}</Text>
    ),
  },
  {
    title: <HeaderCell title="Supplier Address2" className={'font-extrabold'} />,
    dataIndex: 'supplierAddress2',
    key: 'supplierAddress2',
    width: 20,
    render: (value) => (
      <Text className="font-medium text-gray-700">{value || '---'}</Text>
    ),
  },
  {
    title: <HeaderCell title="Supplier Landmark" className={'font-extrabold'} />,
    dataIndex: 'supplierLandmark',
    key: 'supplierLandmark',
    width: 20,
    render: (value) => (
      <Text className="font-medium text-gray-700">{value || '---'}</Text>
    ),
  },
   
  {
    title: <HeaderCell title="Supplier Country" className={'font-extrabold'} />,
    dataIndex: 'supplierCountry',
    key: 'supplierCountry',
    width: 150,
    render: (value) => (
      <Text className="font-medium text-gray-700">{value || '---'}</Text>
    ),
  },
  {
    title: <HeaderCell title="Supplier State" className={'font-extrabold'} />,
    dataIndex: 'supplierState',
    key: 'supplierState',
    width: 150,
    render: (value) => (
      <Text className="font-medium text-gray-700">{value || '---'}</Text>
    ),
  },
  {
    title: <HeaderCell title="Supplier City" className={'font-extrabold'} />,
    dataIndex: 'supplierCity',
    key: 'supplierCity',
    width: 150,
    render: (value) => (
      <Text className="font-medium text-gray-700">{value || '---'}</Text>
    ),
  },
  {
    title: <HeaderCell title="Supplier PostCode" className={'font-extrabold'} />,
    dataIndex: 'supplierPostCode',
    key: 'supplierPostCode',
    width: 150,
    render: (value) => (
      <Text className="font-medium text-gray-700">{value || '---'}</Text>
    ),
  },
  {
    title: <HeaderCell title="Supplier Contact" className={'font-extrabold'} />,
    dataIndex: 'supplierContactPhone',
    key: 'supplierContactPhone',
    width: 150,
    render: (value) => (
      <Text className="font-medium text-gray-700">{value || '---'}</Text>
    ),
  },
   {
    title: <HeaderCell title="Supplier Status" className={'font-extrabold'} />,
    dataIndex: 'supplierStatus',
    key: 'supplierStatus',
    width: 150,
    render: (value) => (
      <Text className="font-medium text-gray-700">{value || '---'}</Text>
    ),
  },
 

  
  {
    title: <HeaderCell title="Supplier Gst" className={'font-extrabold'} />,
    dataIndex: 'supplierGst',
    key: 'supplierGst',
    width: 150,
    render: (value) => (
      <Text className="font-medium text-gray-700">{value || '---'}</Text>
    ),
  },
  {
    title: <HeaderCell title="Supplier PAN" className={'font-extrabold'} />,
    dataIndex: 'supplierPan',
    key: 'supplierPan',
    width: 150,
    render: (value) => (
      <Text className="font-medium text-gray-700">{value || '---'}</Text>
    ),
  },
  {
    title: <HeaderCell title="Supplier VAT" className={'font-extrabold'} />,
    dataIndex: 'supplierVat',
    key: 'supplierVat',
    width: 150,
    render: (value) => (
      <Text className="font-medium text-gray-700">{value || '---'}</Text>
    ),
  },
  {
    title: <HeaderCell title="Supplier TAN" className={'font-extrabold'} />,
    dataIndex: 'supplierTan',
    key: 'supplierTan',
    width: 150,
    render: (value) => (
      <Text className="font-medium text-gray-700">{value || '---'}</Text>
    ),
  },
  {
    title: <HeaderCell title="Actions" className={'font-extrabold'} />,
    dataIndex: 'action',
    key: 'action',
    width: 130,
    render: (_, row) => (
      <div className="flex items-center gap-3 pe-4">
        <Tooltip size="sm" content={'Edit Supplier'} placement="top" color="invert">
        <label>
            <ActionIcon as="span" size="sm" variant="outline" className="hover:text-gray-700" onClick={()=>EditScreen(openModal, closeModal, row, 'Edit Supplier Master' , AddSupplierMaster, 1200)}>
              <PencilIcon className="h-4 w-4" />
            </ActionIcon>
          </label>
        </Tooltip>
        <DeletePopover title={`Delete Customer Master`}  description={`Are you sure you want to delete this Master?`} 
         loading={loading}
          onDelete={() => DeleteItem(row.id,setLoading)} 
        />
      </div>
    ),
  },
];



const DeleteItem = async (id, setLoading) => {
  setLoading(true);
  try {
    const json = { id };
    const result = await HitApi(json, deleteSupplier);

    if (result.status === 200) {
      alert(result.message);
      window.location.pathname = '/master/supplier';
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