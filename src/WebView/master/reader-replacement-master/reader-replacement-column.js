import { Text, Tooltip, ActionIcon } from 'rizzui';
import { HeaderCell } from '../../../Component/ui/table';
import { routes } from '../../../config/routes';
import DeletePopover from '../../../shared/delete-popover';
import PencilIcon from '../../../Constant/Icons/pencil';

export const getReaderReplacementColumn = ({ sortConfig, onDeleteItem, onHeaderCellClick, openModal }) => [
  {
    title: (
      <HeaderCell title="#" />
    ),
    dataIndex: 'index',
    key: 'index',
    width:0,
    render: (value) => <Text>{value || '---'}</Text>,
  },
  {
    title: <HeaderCell title="Reader Type" className={'font-extrabold'} />,
    dataIndex: 'readerType',
    key: 'readerType',
    width: 0,
    render: (value) => (
      <Text className="font-medium text-gray-700">{value || '---'}</Text>
    ),
  },
  {
    title: <HeaderCell title="Reader Type" className={'font-extrabold'} />,
    dataIndex: 'readerType',
    key: 'readerType',
    width: 0,
    render: (value) => (
      <Text className="font-medium text-gray-700">{value || '---'}</Text>
    ),
  },
  {
    title: <HeaderCell title="Reader Placement"  className={'font-extrabold'}/>,
    dataIndex: 'readerPlacement',
    key: 'readerPlacement',
    width: 0,
    render: (value) => (
      <Text className="font-medium text-gray-700">{value || '---'}</Text>
    ),
  },
  {
    title: <HeaderCell title="Reader Info"  className={'font-extrabold'}/>,
    dataIndex: 'readerInfo',
    key: 'readerInfo',
    width: 20,
    render: (value) => (
      <Text className="font-medium text-gray-700">{value || '---'}</Text>
    ),
  },

];
