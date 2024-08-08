import { Text, Tooltip, ActionIcon } from 'rizzui';
import { HeaderCell } from '../../../Component/ui/table';
import { routes } from '../../../config/routes';
import DeletePopover from '../../../shared/delete-popover';
import PencilIcon from '../../../Constant/Icons/pencil';
import ProtectIcon from '../../../Constant/Icons/protect';
import SearchUser from '../../../shared/common/search-user';
import { PiInfoFill } from 'react-icons/pi';
import BuildingReaderInfo from '../../../InfoModal/building-reader-info/building-reader-info';
import { EditScreen } from '../../../shared/edit-screen';
import AddBuildingMaster from '../../../Form/master/building-master/add-building-master';

export const getBuildingMasterColumns = ({ onDeleteItem, openModal, closeModal }) => [
  {
    title: (
      <HeaderCell title="#" />
    ),
    dataIndex: 'index',
    key: 'index',
    width: 30,
    render: (value) => <Text>{value || '---'}</Text>,
  },
  {
    title: <HeaderCell title="Building Name" className={'font-extrabold'} />,
    dataIndex: 'buildingName',
    key: 'buildingName',
    width: 150,
    render: (value) => (
      <Text className="font-medium text-gray-700">{value || '---'}</Text>
    ),
  },
  {
    title: <HeaderCell title="Building No" className={'font-extrabold'} />,
    dataIndex: 'buildingNo',
    key: 'buildingNo',
    width: 150,
    render: (value) => (
      <Text className="font-medium text-gray-700">{value || '---'}</Text>
    ),
  },
  {
    title: <HeaderCell title="Readers" className={'font-extrabold'} />,
    dataIndex: 'NoOfReaders',
    key: 'NoOfReaders',
    width: 20,
    render: (value, row) => (
      <div className='flex justify-between items-center'>
        <Text className="font-medium text-gray-700">{value || '---'}</Text>
        <span className='cursor-pointer'><PiInfoFill size={18} onClick={() => openModal({ view: <BuildingReaderInfo row={row} /> })}/></span>
      </div>
    ),
  }, {
    title: <HeaderCell title="Plant" className={'font-extrabold'} />,
    dataIndex: 'status',
    key: 'status',
    width: 150,
    render: (value) => (
      <Text className="font-medium text-gray-700">{value || '---'}</Text>
    ),
  }, {
    title: <HeaderCell title="Add Empty Bag" className={'font-extrabold'} />,
    dataIndex: 'status',
    key: 'status',
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
        <Tooltip size="sm" content={'Edit User'} placement="top" color="invert">
          <label>
            <ActionIcon as="span" size="sm" variant="outline" className="hover:text-gray-700"  onClick={()=>EditScreen(openModal, closeModal, row, 'Edit Building Master' , AddBuildingMaster)}>
              <PencilIcon className="h-4 w-4" />
            </ActionIcon>
          </label>
        </Tooltip>
        <DeletePopover title={`Delete User`} description={`Are you sure you want to delete this employee?`}
          onDelete={() => onDeleteItem(row.id)}
        />
        <Tooltip size="sm" content={'Search User'} placement="top" color="invert">
          <label>
            <ActionIcon as="span" size="sm" variant="outline" className="hover:text-gray-700" onClick={() => openModal({ view: <SearchUser /> })}>
              <ProtectIcon className="h-4 w-4" />
            </ActionIcon>
          </label>
        </Tooltip>
      </div>
    ),
  },
];
