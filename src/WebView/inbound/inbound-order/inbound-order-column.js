import { ActionIcon, Text, Tooltip } from 'rizzui';
import { HeaderCell } from '../../../Component/ui/table';
import PencilIcon from '../../../Constant/Icons/pencil';
import DeletePopover from '../../../shared/delete-popover';
import { routes } from '../../../config/routes';
import SearchUser from '../../../shared/common/search-user';
import EyeIcon from '../../../Constant/Icons/eye';

export const getInboundOrderColumn = ({ sortConfig, onDeleteItem, onHeaderCellClick, openModal }) => [
 
    {
        title: <HeaderCell title="#" />,
        dataIndex: 'index',
        key: 'index',
        width: 20,
        render: (value) => <Text>{value || '---'}</Text>,
      },
      {
        title: <HeaderCell title="Order Code" className={'font-extrabold'} />,
        dataIndex: 'orderCode',
        key: 'orderCode',
        width: 130,
        render: (value) => (
          <Text className="font-medium text-gray-700">{value || '---'}</Text>
        ),
      },
      {
        title: <HeaderCell title="Order Date Time" className={'font-extrabold'} />,
        dataIndex: 'orderDateTime',
        key: 'orderDateTime',
        width: 130,
        render: (value) => (
          <Text className="font-medium text-gray-700">{value || '---'}</Text>
        ),
      }, {
        title: <HeaderCell title="Order Type" className={'font-extrabold'} />,
        dataIndex: 'orderType',
        key: 'orderType',
        width: 130,
        render: (value) => (
          <Text className="font-medium text-gray-700">{value || '---'}</Text>
        ),
      }, {
        title: <HeaderCell title="Order Status" className={'font-extrabold'} />,
        dataIndex: 'orderStatus',
        key: 'orderStatus',
        width: 130,
        render: (value) => (
          <Text className="font-medium text-gray-700">{value || '---'}</Text>
        ),
      },
      {
        title: <HeaderCell title="Customer Code" className={'font-extrabold'} />,
        dataIndex: 'customerCode',
        key: 'customerCode',
        width: 120,
        render: (value) => (
          <Text className="font-medium text-gray-700">{value || '---'}</Text>
        ),
      }, {
        title: <HeaderCell title="Supplier ID" className={'font-extrabold'} />,
        dataIndex: 'supplierID',
        key: 'supplierID',
        width: 120,
        render: (value) => (
          <Text className="font-medium text-gray-700">{value || '---'}</Text>
        ),
      },
      {
        title: <HeaderCell title="Actions" className={'font-extrabold'} />,
        dataIndex: 'action',
        key: 'action',
        width: 120,
        render: (_, row) => (
          <div className="flex items-center gap-3 pe-4">
            <Tooltip size="sm" content={'Edit'} placement="top" color="invert">
              <label href={routes?.eCommerce?.editOrder(row._id)}>
                <ActionIcon as="span" size="sm" variant="outline" className="hover:text-gray-700">
                  <PencilIcon className="h-4 w-4" />
                </ActionIcon>
              </label>
            </Tooltip>
           
            <Tooltip size="sm" content={'View'} placement="top" color="invert">
              <label href={routes?.eCommerce?.editOrder(row._id)}>
                <ActionIcon as="span" size="sm" variant="outline" className="hover:text-gray-700" onClick={() => openModal({ view: <SearchUser /> })}>
                <EyeIcon className="w-5 h-5" />
                </ActionIcon>
              </label>
            </Tooltip>
          </div>
        ),
      },

];
