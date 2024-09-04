import { Text, Tooltip, ActionIcon } from 'rizzui';
import { HeaderCell } from '../../../Component/ui/table';
import { routes } from '../../../config/routes';
import DeletePopover from '../../../shared/delete-popover';
import PencilIcon from '../../../Constant/Icons/pencil';
import { PiInfoFill } from 'react-icons/pi';
import ReaderMasterBuildingInfo from '../../../InfoModal/reader-master-building-info/reader-master-building-info';
import { HitApi } from '../../../Store/Action/Api/ApiAction';
import { deleteReader } from '../../../Constant/Api/Api';
import { IoMdSettings } from "react-icons/io";


export const getReaderMasterColumns = ({ openModal, loadData }) => {
  const ApiHit = loadData;
  return [
    {
      title: <HeaderCell title="#" />,
      dataIndex: 'index',
      key: 'index',
      width: 30,
      render: (value) => <Text>{value || '---'}</Text>,
    },
    {
      title: <HeaderCell title="Placement" className={'font-extrabold'} />,
      dataIndex: 'placementName',
      key: 'placement',
      width: 120,
      render: (value) => (
        <Text className="font-medium text-gray-700">{value || '---'}</Text>
      ),
    },
    {
      title: <HeaderCell title="Reader Type" className={'font-extrabold'} />,
      dataIndex: 'readerTypeName',
      key: 'readerType',
      width: 150,
      render: (value) => (
        <Text className="font-medium text-gray-700">{value || '---'}</Text>
      ),
    }, {
      title: <HeaderCell title="Reader Action" className={'font-extrabold'} />,
      dataIndex: 'readerAction',
      key: 'readerAction',
      width: 150,
      render: (value) => (
        <Text className="font-medium text-gray-700">{value || '---'}</Text>
      ),
    }, {
      title: <HeaderCell title="Status" className={'font-extrabold'} />,
      dataIndex: 'status',
      key: 'status',
      width: 150,
      render: (value) => (
        <Text className="font-medium text-gray-700">{value || '---'}</Text>
      ),
    },
    {
      title: <HeaderCell title="Building DEtails" className={'font-extrabold'} />,
      dataIndex: 'buildingDetails',
      key: 'buildingDetails',
      width: 20,
      render: (value, row) => (
        <div className='flex justify-between items-center'>
          <Text className="font-medium text-gray-700">{value || '---'}</Text>
          <span className='cursor-pointer'><PiInfoFill size={18} onClick={() => openModal({ view: <ReaderMasterBuildingInfo row={row} /> })} /></span>
        </div>
      ),
    }, {
      title: <HeaderCell title="Zone" className={'font-extrabold'} />,
      dataIndex: 'zone',
      key: 'zone',
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
            <a href={'/device/reader/edit/' + row._id}>
              <ActionIcon as="span" size="sm" variant="outline" className="hover:text-gray-700">
                <PencilIcon className="h-4 w-4" />
              </ActionIcon>
            </a>
          </Tooltip>
          <Tooltip size="sm" content={'Check Device'} placement="top" color="invert">
            <a href={'/device/reader/reader-configuration/' + row._id}>
              <ActionIcon as="span" size="sm" variant="outline" className="hover:text-gray-700">
                <IoMdSettings className="h-4 w-4" />
              </ActionIcon>
            </a>
          </Tooltip>
          {row?.locationIds?.length === 0 && (
            <DeletePopover
              title="Delete Reader"
              description="Are you sure you want to delete this Reader?"
              onDelete={() => onDeleteItem(row?._id, ApiHit)}
            />
          )}
        </div>
      ),
    },
  ];
}


export const onDeleteItem = (_id, ApiHit) => {
  var json = { _id: _id }

  HitApi(json, deleteReader).then((Result) => {

    if (Result.status === 200) {
      // window.location.reload() 
      if (ApiHit) { ApiHit() }
    }
  })
}