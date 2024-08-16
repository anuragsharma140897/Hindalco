import { Text, Tooltip, ActionIcon } from 'rizzui';
import { HeaderCell } from '../../../Component/ui/table';
import { routes } from '../../../config/routes';
import DeletePopover from '../../../shared/delete-popover';
import PencilIcon from '../../../Constant/Icons/pencil';
import AddSiteMaster from '../../../Form/master/site-master/add-site-master';
import {EditScreen} from '../../../shared/edit-screen';
import { HitApi } from '../../../Store/Action/Api/ApiAction';
import { deleteSite } from '../../../Constant/Api/Api';

export const getSiteMasterColumns = ({ openModal, closeModal }) => [
  {
    title: (
      <HeaderCell title="#" />
    ),
    dataIndex: 'index',
    key: 'index',
    width: 10,
    render: (value) => <Text>{value || '---'}</Text>,
  },
  {
    title: <HeaderCell title="Site Name" className={'font-extrabold'} />,
    dataIndex: 'siteName',
    key: 'siteName',
    width: 100,
    render: (value) => (
      <Text className="font-medium text-gray-700">{value || '---'}</Text>
    ),
  },
  {
    title: <HeaderCell title="Building"  className={'font-extrabold'}/>,
    dataIndex: 'buildings',
    key: 'buildings',
    width: 100,
    render: (value) => (
      <Text className="font-medium text-gray-700">{value || '---'}</Text>
    ),
  },
  {
    title: <HeaderCell title="Area"  className={'font-extrabold'}/>,
    dataIndex: 'area',
    key: 'area',
    width: 100,
    render: (value) => (
      <Text className="font-medium text-gray-700">{value || '---'}</Text>
    ),
  },
  {
    title: <HeaderCell title="Status"  className={'font-extrabold'}/>,
    dataIndex: 'status',
    key: 'status',
    width: 80,
    render: (value) => (
      <Text className="font-medium text-gray-700">{value || '---'}</Text>
    ),
  },
  {
    title: <HeaderCell title="Actions" className={'font-extrabold'}/>,
    dataIndex: 'action',
    key: 'action',
    width: 600,
    render: (_, row) => (
      <div className="flex items-center gap-3 pe-4">
        <Tooltip size="sm" content={'Edit Site Master'} placement="top" color="invert">
          <label>
            <ActionIcon as="span" size="sm" variant="outline" className="hover:text-gray-700" onClick={()=>EditScreen(openModal, closeModal, row, 'Edit Site Master' , AddSiteMaster, 400)}>
              <PencilIcon className="h-4 w-4" />
            </ActionIcon>
          </label>
        </Tooltip>
        <DeletePopover title={`Delete Site Master`}  description={`Are you sure you want to delete this employee?`} 
          onDelete={() => DeleteItem(row.id)} 
        />
      </div>
    ),
  },
];


export const DeleteItem = (id) =>{
  var json = {id:id}
  HitApi(json, deleteSite).then((Result)=>{

  })
}