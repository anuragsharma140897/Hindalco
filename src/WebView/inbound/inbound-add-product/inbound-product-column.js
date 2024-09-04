import { Text, Tooltip, ActionIcon } from 'rizzui';
import { HeaderCell } from '../../../Component/ui/table';
import DeletePopover from '../../../shared/delete-popover';
import PencilIcon from '../../../Constant/Icons/pencil';
import AddSiteMaster from '../../../Form/master/site-master/add-site-master';
import { EditScreen } from '../../../shared/edit-screen';
import { HitApi } from '../../../Store/Action/Api/ApiAction';
import { deleteGeneral, deleteSite } from '../../../Constant/Api/Api';
import AddGeneralMaster from '../../../Form/master/general-master/add-general-master';


export const inboundProductColumns = ({ openModal, closeModal, loading, setLoading }) => [


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
    dataIndex: 'productName',
    key: 'productName',
    width: 100,
    render: (value) => (
      <Text className="font-medium text-gray-700">{value || '---'}</Text>
    ),
  },
  {
    title: <HeaderCell title="Product Code" className={'font-extrabold'} />,
    dataIndex: 'productCode',
    key: 'productCode',
    width: 100,
    render: (value) => (
      <Text className="font-medium text-gray-700">{value || '---'}</Text>
    ),
  },
  {
    title: <HeaderCell title="Quantity" className={'font-extrabold'} />,
    dataIndex: 'quantity',
    key: 'quantity',
    width: 100,
    render: (value) => (
      <Text className="font-medium text-gray-700">{value || '---'}</Text>
    ),
  },
  {
    title: <HeaderCell title="Product Description" className={'font-extrabold'} />,
    dataIndex: 'productDescription',
    key: 'productDescription',
    width: 100,
    render: (value) => (
      <Text className="font-medium text-gray-700">{value || '---'}</Text>
    ),
  },
  {
    title: <HeaderCell title="Product Group" className={'font-extrabold'} />,
    dataIndex: 'productGroup',
    key: 'productGroup',
    width: 100,
    render: (value) => (
      <Text className="font-medium text-gray-700">{value || '---'}</Text>
    ),
  },
  {
    title: <HeaderCell title="Height" className={'font-extrabold'} />,
    dataIndex: 'height',
    key: 'height',
    width: 100,
    render: (value) => (
      <Text className="font-medium text-gray-700">{value || '---'}</Text>
    ),
  },
  {
    title: <HeaderCell title="Width" className={'font-extrabold'} />,
    dataIndex: 'width',
    key: 'width',
    width: 100,
    render: (value) => (
      <Text className="font-medium text-gray-700">{value || '---'}</Text>
    ),
  },
  {
    title: <HeaderCell title="Length" className={'font-extrabold'} />,
    dataIndex: 'length',
    key: 'length',
    width: 100,
    render: (value) => (
      <Text className="font-medium text-gray-700">{value || '---'}</Text>
    ),
  },
  {
    title: <HeaderCell title="Packed Weight" className={'font-extrabold'} />,
    dataIndex: 'packedWeight',
    key: 'packedWeight',
    width: 100,
    render: (value) => (
      <Text className="font-medium text-gray-700">{value || '---'}</Text>
    ),
  },
  {
    title: <HeaderCell title="Weight" className={'font-extrabold'} />,
    dataIndex: 'weight',
    key: 'weight',
    width: 100,
    render: (value) => (
      <Text className="font-medium text-gray-700">{value || '---'}</Text>
    ),
  },
  {
    title: <HeaderCell title="Buying Cost" className={'font-extrabold'} />,
    dataIndex: 'buyingCost',
    key: 'buyingCost',
    width: 100,
    render: (value) => (
      <Text className="font-medium text-gray-700">{value || '---'}</Text>
    ),
  },
  {
    title: <HeaderCell title="Selling Cost" className={'font-extrabold'} />,
    dataIndex: 'sellingCost',
    key: 'sellingCost',
    width: 100,
    render: (value) => (
      <Text className="font-medium text-gray-700">{value || '---'}</Text>
    ),
  },
  {
    title: <HeaderCell title="Grade" className={'font-extrabold'} />,
    dataIndex: 'grade',
    key: 'grade',
    width: 100,
    render: (value) => (
      <Text className="font-medium text-gray-700">{value || '---'}</Text>
    ),
  },

];



const DeleteItem = async (_id, setLoading) => {
  setLoading(true);
  try {
    const json = { _id };
    const result = await HitApi(json, deleteGeneral);

    if (result.status === 200) {
      alert(result.message);
      window.location.pathname = '/master/general';
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
