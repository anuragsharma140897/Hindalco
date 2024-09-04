import { Text, Tooltip, ActionIcon } from 'rizzui';
import { HeaderCell } from '../../../Component/ui/table';
import DeletePopover from '../../../shared/delete-popover';
import PencilIcon from '../../../Constant/Icons/pencil';
import { deleteProduct, deleteWeighingScale } from '../../../Constant/Api/Api';
import { HitApi } from '../../../Store/Action/Api/ApiAction';

export const getWeighinigScaleColoumn = () => [
  {
    title: <HeaderCell title="#" />,
    dataIndex: 'index',
    key: 'index',
    width: 30,
    render: (value) => <Text>{value || '---'}</Text>,
  },
  {
    title: <HeaderCell title="Weighing Scale Name" className={'font-extrabold'} />,
    dataIndex: 'weighingScaleName',
    key: 'productName',
    width: 120,
    render: (value) => (
      <Text className="font-medium text-gray-700">{value || '---'}</Text>
    ),
  },
  {
    title: <HeaderCell title="Weighing Scale Type" className={'font-extrabold'} />,
    dataIndex: 'weighingScaleType',
    key: 'productDescription',
    width: 150,
    render: (value) => (
      <Text className="font-medium text-gray-700">{value || '---'}</Text>
    ),
  }, {
    title: <HeaderCell title="Weighing Scale Serial No" className={'font-extrabold'} />,
    dataIndex: 'weighingScaleSerialNo',
    key: 'productGroup',
    width: 150,
    render: (value) => (
      <Text className="font-medium text-gray-700">{value || '---'}</Text>
    ),
  }, {
    title: <HeaderCell title="Weighing Scale Port" className={'font-extrabold'} />,
    dataIndex: 'weighingScalePort',
    key: 'sellingCost',
    width: 150,
    render: (value) => (
      <Text className="font-medium text-gray-700">{value || '---'}</Text>
    ),
  },
  {
    title: <HeaderCell title="Weighing Scale IP" className={'font-extrabold'} />,
    dataIndex: 'weighingScaleIp',
    key: 'weight',
    width: 20,
    render: (value) => (
      <Text className="font-medium text-gray-700">{value || '---'}</Text>
    ),
  }, {
    title: <HeaderCell title="Weighing Scale ID" className={'font-extrabold'} />,
    dataIndex: 'weighingScaleId',
    key: 'grade',
    width: 150,
    render: (value) => (
      <Text className="font-medium text-gray-700">{value || '---'}</Text>
    ),
  }, {
    title: <HeaderCell title="Weighing Scale Building ID" className={'font-extrabold'} />,
    dataIndex: 'weighingScaleBuildingId',
    key: 'batch',
    width: 150,
    render: (value) => (
      <Text className="font-medium text-gray-700">{value === true ? 'true' : value === false ? 'false' : value ? value : '---'}</Text>
    ),
  }, {
    title: <HeaderCell title="Weighing Scale Frequency" className={'font-extrabold'} />,
    dataIndex: 'weighingScaleFrequency',
    key: 'lot',
    width: 150,
    render: (value) => (
      <Text className="font-medium text-gray-700">{value === true ? 'true' : value === false ? 'false' : value ? value : '---'}</Text>
    ),
  },
  {
    title: <HeaderCell title="Actions" className={'font-extrabold'} />,
    dataIndex: 'action',
    key: 'action',
    width: 130,
    render: (_, row) => (
      <div className="flex items-center gap-3 pe-4">
        <Tooltip size="sm" content={'Edit Product'} placement="top" color="invert">
          <a href={'/device/weighingscale/edit/' + row._id}>
            <ActionIcon as="span" size="sm" variant="outline" className="hover:text-gray-700">
              <PencilIcon className="h-4 w-4" />
            </ActionIcon>
          </a>
        </Tooltip>
        <DeletePopover title={`Delete User`} description={`Are you sure you want to delete this employee?`}
          onDelete={() => DeleteItem(row._id)}
        />
        {/* <Tooltip size="sm" content={'Search User'} placement="top" color="invert">
          <label href={routes?.eCommerce?.editOrder(row._id)}>
            <ActionIcon as="span" size="sm" variant="outline" className="hover:text-gray-700" onClick={() => openModal({ view: <SearchUser /> })}>
              <ProtectIcon className="h-4 w-4" />
            </ActionIcon>
          </label>
        </Tooltip> */}
      </div>
    ),
  },
];

export const DeleteItem = (_id) => {
  var json = { _id: _id }
  HitApi(json, deleteWeighingScale).then((Result) => {
    if (Result.status === 200) {
      window.location.reload()
    }
  })
}