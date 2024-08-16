import { Text, Tooltip, ActionIcon } from 'rizzui';
import { HeaderCell } from '../../../Component/ui/table';
import { routes } from '../../../config/routes';
import DeletePopover from '../../../shared/delete-popover';
import PencilIcon from '../../../Constant/Icons/pencil';
import { deleteCustomer } from '../../../Constant/Api/Api';
import { HitApi } from '../../../Store/Action/Api/ApiAction';
import CustomerMaster from './customer-master';
import { EditScreen } from '../../../shared/edit-screen';
import AddCustomeMaster from '../../../Form/master/customer-master/add-customer-master';

export const getCustomerMasterColumns = ({ closeModal, openModal }) => [
  {
    title: <HeaderCell title="#" />,
    dataIndex: 'index',
    key: 'index',
    width: 30,
    render: (value) => <Text>{value || '---'}</Text>,
  },
  {
    title: <HeaderCell title="Customer Name" className={'font-extrabold'} />,
    dataIndex: 'customerName',
    key: 'customerName',
    width: 120,
    render: (value) => (
      <Text className="font-medium text-gray-700">{value || '---'}</Text>
    ),
  },
  {
    title: <HeaderCell title="Customer Code" className={'font-extrabold'} />,
    dataIndex: 'customerCode',
    key: 'customerCode',
    width: 150,
    render: (value) => (
      <Text className="font-medium text-gray-700">{value || '---'}</Text>
    ),
  },
  {
    title: <HeaderCell title="Customer Group" className={'font-extrabold'} />,
    dataIndex: 'customerGroup',
    key: 'customerGroup',
    width: 150,
    render: (value) => (
      <Text className="font-medium text-gray-700">{value || '---'}</Text>
    ),
  },
  {
    title: <HeaderCell title="Customer Email" className={'font-extrabold'} />,
    dataIndex: 'customerEmail',
    key: 'customerEmail',
    width: 150,
    render: (value) => (
      <Text className="font-medium text-gray-700">{value || '---'}</Text>
    ),
  },
  {
    title: <HeaderCell title="Customer Visibility" className={'font-extrabold'} />,
    dataIndex: 'customerVisibility',
    key: 'customerVisibility',
    width: 150,
    render: (value) => (
      <Text className="font-medium text-gray-700">{value || '---'}</Text>
    ),
  },
  {
    title: <HeaderCell title="Customer Type" className={'font-extrabold'} />,
    dataIndex: 'customerType',
    key: 'customerType',
    width: 150,
    render: (value) => (
      <Text className="font-medium text-gray-700">{value || '---'}</Text>
    ),
  },
  {
    title: <HeaderCell title="Customer Add1" className={'font-extrabold'} />,
    dataIndex: 'customerAddress1',
    key: 'customerAddress1',
    width: 150,
    render: (value) => (
      <Text className="font-medium text-gray-700">{value || '---'}</Text>
    ),
  },
  {
    title: <HeaderCell title="Customer Add2" className={'font-extrabold'} />,
    dataIndex: 'customerAddress2',
    key: 'customerAddress2',
    width: 150,
    render: (value) => (
      <Text className="font-medium text-gray-700">{value || '---'}</Text>
    ),
  },
  {
    title: <HeaderCell title="Customer Landmark" className={'font-extrabold'} />,
    dataIndex: 'customerLandmark',
    key: 'customerLandmark',
    width: 150,
    render: (value) => (
      <Text className="font-medium text-gray-700">{value || '---'}</Text>
    ),
  },
  {
    title: <HeaderCell title="Customer City" className={'font-extrabold'} />,
    dataIndex: 'customerCity',
    key: 'customerCity',
    width: 150,
    render: (value) => (
      <Text className="font-medium text-gray-700">{value || '---'}</Text>
    ),
  },
  {
    title: <HeaderCell title="Customer State" className={'font-extrabold'} />,
    dataIndex: 'customerState',
    key: 'customerState',
    width: 150,
    render: (value) => (
      <Text className="font-medium text-gray-700">{value || '---'}</Text>
    ),
  },
  {
    title: <HeaderCell title="Customer Region" className={'font-extrabold'} />,
    dataIndex: 'customerRegion',
    key: 'customerRegion',
    width: 150,
    render: (value) => (
      <Text className="font-medium text-gray-700">{value || '---'}</Text>
    ),
  },
  {
    title: <HeaderCell title="Customer Postcode" className={'font-extrabold'} />,
    dataIndex: 'customerPostCode',
    key: 'customerPostCode',
    width: 150,
    render: (value) => (
      <Text className="font-medium text-gray-700">{value || '---'}</Text>
    ),
  },
  {
    title: <HeaderCell title="Customer Country" className={'font-extrabold'} />,
    dataIndex: 'customerCountry',
    key: 'customerCountry',
    width: 150,
    render: (value) => (
      <Text className="font-medium text-gray-700">{value || '---'}</Text>
    ),
  },
  {
    title: <HeaderCell title="Customer Contact" className={'font-extrabold'} />,
    dataIndex: 'customerContact',
    key: 'customerContact',
    width: 150,
    render: (value) => (
      <Text className="font-medium text-gray-700">{value || '---'}</Text>
    ),
  },
  {
    title: <HeaderCell title="Customer Gst" className={'font-extrabold'} />,
    dataIndex: 'customerGst',
    key: 'customerGst',
    width: 150,
    render: (value) => (
      <Text className="font-medium text-gray-700">{value || '---'}</Text>
    ),
  },
  {
    title: <HeaderCell title="Customer PAN" className={'font-extrabold'} />,
    dataIndex: 'customerPan',
    key: 'customerPan',
    width: 150,
    render: (value) => (
      <Text className="font-medium text-gray-700">{value || '---'}</Text>
    ),
  },
  {
    title: <HeaderCell title="Customer Status" className={'font-extrabold'} />,
    dataIndex: 'customerStatus',
    key: 'customerStatus',
    width: 150,
    render: (value) => (
      <Text className="font-medium text-gray-700">{value || '---'}</Text>
    ),
  },
  {
    title: <HeaderCell title="Customer Vat" className={'font-extrabold'} />,
    dataIndex: 'customerVat',
    key: 'customerVat',
    width: 150,
    render: (value) => (
      <Text className="font-medium text-gray-700">{value || '---'}</Text>
    ),
  },
  {
    title: <HeaderCell title="Customer TAN" className={'font-extrabold'} />,
    dataIndex: 'customerTan',
    key: 'customerTan',
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
        <Tooltip size="sm" content={'Edit Customer'} placement="top" color="invert">
        <label>
            <ActionIcon as="span" size="sm" variant="outline" className="hover:text-gray-700" onClick={()=>EditScreen(openModal, closeModal, row, 'Edit Customer Master' , AddCustomeMaster, 1200)}>
              <PencilIcon className="h-4 w-4" />
            </ActionIcon>
          </label>
        </Tooltip>
        <DeletePopover title={`Delete Customer Master`}  description={`Are you sure you want to delete this employee?`} 
          onDelete={() => DeleteItem(row.id)} 
        />
      </div>
    ),
  },
];


export const DeleteItem = (id) =>{
  var json = {id:id}
  HitApi(json, deleteCustomer).then((Result)=>{
    console.log('Result', Result);
  })
}
