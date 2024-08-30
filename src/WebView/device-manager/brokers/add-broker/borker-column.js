import { ActionIcon, Text, Tooltip } from "rizzui";
import { HeaderCell } from "../../../../Component/ui/table";
import PencilIcon from "../../../../Constant/Icons/pencil";
import { EditScreen } from "../../../../shared/edit-screen";
import AddSupplierMaster from "../../../../Form/master/supplier-master/add-supplier-master";
import DeletePopover from "../../../../shared/delete-popover";
import { HitApi } from "../../../../Store/Action/Api/ApiAction";
import { deleteBroker, deleteSupplier } from "../../../../Constant/Api/Api";


export const getBrokersColumns = ({openModal, closeModal, loading, setLoading  }) => [
  {
    title: <HeaderCell title="#" />,
    dataIndex: 'index',
    key: 'index',
    width: 30,
    render: (value) => <Text>{value || '---'}</Text>,
  },
  {
    title: <HeaderCell title="Broker Type" className={'font-extrabold'} />,
    dataIndex: 'brokerType',
    key: 'brokerType',
    width: 150,
    render: (value) => (
      <Text className="font-medium text-gray-700">{value || '---'}</Text>
    ),
  }, {
    title: <HeaderCell title="Broker Ip" className={'font-extrabold'} />,
    dataIndex: 'brokerIp',
    key: 'brokerIp',
    width: 150,
    render: (value) => (
      <Text className="font-medium text-gray-700">{value || '---'}</Text>
    ),
  },
  {
    title: <HeaderCell title="Broker Port" className={'font-extrabold'} />,
    dataIndex: 'brokerPort',
    key: 'brokerPort',
    width: 150,
    render: (value) => (
      <Text className="font-medium text-gray-700">{value || '---'}</Text>
    ),
  },
  {
    title: <HeaderCell title="Broker Secure Connection" className={'font-extrabold'} />,
    dataIndex: 'isBrokerSecureConnection',
    key: 'isBrokerSecureConnection',
    width: 150,
    render: (value) => (
      <Text className="font-medium text-gray-700">{value ? "True" : "False"}</Text>
    ),
  },


  {
    title: <HeaderCell title="Actions" className={'font-extrabold'} />,
    dataIndex: 'action',
    key: 'action',
    width: 130,
    render: (_, row) => (
      <div className="flex items-center gap-3 pe-4">
        <Tooltip size="sm" content={'Edit Broker'} placement="top" color="invert">
            <a href={'/device-manager/broker/edit/' + row._id}>
            <ActionIcon as="span" size="sm" variant="outline" className="hover:text-gray-700">
              <PencilIcon className="h-4 w-4" />
            </ActionIcon>
          </a>
        </Tooltip>
        <DeletePopover title={`Delete Broker`}  description={`Are you sure you want to delete?`} 
         loading={loading}
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
    const result = await HitApi(json, deleteBroker);

    if (result.status === 200) {
      alert(result.message);
      window.location.pathname = '/device-manager/broker';
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