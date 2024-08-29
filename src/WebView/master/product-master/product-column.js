import { Text, Tooltip, ActionIcon } from 'rizzui';
import { HeaderCell } from '../../../Component/ui/table';
import DeletePopover from '../../../shared/delete-popover';
import PencilIcon from '../../../Constant/Icons/pencil';
import { deleteProduct } from '../../../Constant/Api/Api';
import { HitApi } from '../../../Store/Action/Api/ApiAction';

export const getProductMasterColumns = () => [
  {
    title: <HeaderCell title="#" />,
    dataIndex: 'index',
    key: 'index',
    width: 30,
    render: (value) => <Text>{value || '---'}</Text>,
  },
  {
    title: <HeaderCell title="Product Name" className={'font-extrabold'} />,
    dataIndex: 'productName',
    key: 'productName',
    width: 120,
    render: (value) => (
      <Text className="font-medium text-gray-700">{value || '---'}</Text>
    ),
  },
  {
    title: <HeaderCell title="Product Description" className={'font-extrabold'} />,
    dataIndex: 'productDescription',
    key: 'productDescription',
    width: 150,
    render: (value) => (
      <Text className="font-medium text-gray-700">{value || '---'}</Text>
    ),
  }, {
    title: <HeaderCell title="Product Group" className={'font-extrabold'} />,
    dataIndex: 'productGroup',
    key: 'productGroup',
    width: 150,
    render: (value) => (
      <Text className="font-medium text-gray-700">{value || '---'}</Text>
    ),
  }, {
    title: <HeaderCell title="Selling Cost" className={'font-extrabold'} />,
    dataIndex: 'sellingCost',
    key: 'sellingCost',
    width: 150,
    render: (value) => (
      <Text className="font-medium text-gray-700">{value || '---'}</Text>
    ),
  },
  {
    title: <HeaderCell title="Weight" className={'font-extrabold'} />,
    dataIndex: 'weight',
    key: 'weight',
    width: 20,
    render: (value) => (
      <Text className="font-medium text-gray-700">{value || '---'}</Text>
    ),
  }, {
    title: <HeaderCell title="Grade" className={'font-extrabold'} />,
    dataIndex: 'grade',
    key: 'grade',
    width: 150,
    render: (value) => (
      <Text className="font-medium text-gray-700">{value || '---'}</Text>
    ),
  }, {
    title: <HeaderCell title="Batch" className={'font-extrabold'} />,
    dataIndex: 'captureBatchNo',
    key: 'batch',
    width: 150,
    render: (value) => (
      <Text className="font-medium text-gray-700">{value === true ? 'true' : value === false ? 'false' : value ? value : '---'}</Text>
    ),
  }, {
    title: <HeaderCell title="Lot" className={'font-extrabold'} />,
    dataIndex: 'captureLotNo',
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
          <a href={'/master/product/edit/' + row.id}>
            <ActionIcon as="span" size="sm" variant="outline" className="hover:text-gray-700">
              <PencilIcon className="h-4 w-4" />
            </ActionIcon>
          </a>
        </Tooltip>
        <DeletePopover title={`Delete User`} description={`Are you sure you want to delete this employee?`}
          onDelete={() => DeleteItem(row.id)}
        />
      </div>
    ),
  },
];

export const DeleteItem = (id) => {
  var json = { id: id }
  HitApi(json, deleteProduct).then((Result) => {
    if (Result.status === 200) {
      window.location.reload()
    }
  })
}