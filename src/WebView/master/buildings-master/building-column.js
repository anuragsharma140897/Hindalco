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
import { deleteBuilding } from '../../../Constant/Api/Api';
import { HitApi } from '../../../Store/Action/Api/ApiAction';
import { FaUserPlus } from "react-icons/fa";
import useAlertController from '../../../Hooks/use-alert-controller';
import { useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import TableActions from '../../../Component/ui/table/TableActions';

export const GetBuildingMasterColumns = (openModal, closeModal, ApiHit) => {
  const { showCustomAlert } = useAlertController();
  const [loadingRows, setLoadingRows] = useState({});

  const handleDelete = async (row) => {
    setLoadingRows((prev) => ({ ...prev, [row.index]: true }));

    const json = { _id: row?._id };

    // try {
    //   const result = await HitApi(json, deleteSite);
    //   if (result?.success !== false) {
    //     showCustomAlert({
    //       type: 'success',
    //       title: 'Success!',
    //       message: 'Site Deleted Successfully',
    //     });
    //     if (ApiHit) { ApiHit(); }
    //   } else {
    //     showCustomAlert({
    //       type: 'error',
    //       title: 'Delete Error',
    //       message: 'Unable to delete this role. This role is already linked with a user.',
    //     });
    //   }
    // } catch (err) {

    // } finally {
    //   setLoadingRows((prev) => ({ ...prev, [row.index]: false }));
    // }
    
  };

  const renderCell = (value, row, content) => (
    loadingRows[row.index] ? <Skeleton /> : content
  );
  const columns = [
    {
      title: (
        <HeaderCell title="#" />
      ),
      dataIndex: 'index',
      key: 'index',
      width: 30,
      render: (value, row, index) => renderCell(value, row, <Text>{index + 1 || '---'}</Text>),
    },
    {
      title: <HeaderCell title="Building Name" className={'font-extrabold'} />,
      dataIndex: 'buildingName',
      key: 'buildingName',
      width: 150,
      render: (value, row, index) => renderCell(value, row, <Text>{value  || '---'}</Text>),
    },
    {
      title: <HeaderCell title="Building No" className={'font-extrabold'} />,
      dataIndex: 'buildingNo',
      key: 'buildingNo',
      width: 150,
      render: (value, row, index) => renderCell(value, row, <Text>{value  || '---'}</Text>),
    },
    {
      title: <HeaderCell title="Unit" className={'font-extrabold'} />,
      dataIndex: 'unitName',
      key: 'unitName',
      width: 150,
      render: (value, row, index) => renderCell(value, row, <Text>{value  || '---'}</Text>),
    },
    {
      title: <HeaderCell title="Actions" className={'font-extrabold'} />,
      dataIndex: 'action',
      key: 'action',
      width: 130,
      render: (_, row) => renderCell(null, row, (
        <TableActions
          screen={'buildingMaster'}
          row={row}
          onEdit={(rowData) => EditScreen(openModal, closeModal, rowData, 'Edit Building Master', AddBuildingMaster, 800, ApiHit)}

          onDelete={(rowData) => handleDelete(rowData)}
          checkKeys={[]}
        />
      )),
    }
  ];

  if (!true) {
    columns.push(
      {
        title: <HeaderCell title="Readers" className={'font-extrabold'} />,
        dataIndex: 'NoOfReaders',
        key: 'NoOfReaders',
        width: 20,
        render: (value, row) => (
          <div className='flex justify-between items-center'>
            <Text className="font-medium text-gray-700">{value || '---'}</Text>
            <span className='cursor-pointer'>
              <PiInfoFill size={18} onClick={() => openModal({ view: <BuildingReaderInfo row={row} /> })} />
            </span>
          </div>
        ),
      },
      {
        title: <HeaderCell title="Plant" className={'font-extrabold'} />,
        dataIndex: 'unit',
        key: 'unit',
        width: 150,
        render: (value) => (
          <Text className="font-medium text-gray-700">{value || '---'}</Text>
        ),
      },
      {
        title: <HeaderCell title="Add Empty Bag" className={'font-extrabold'} />,
        dataIndex: 'addEmptyBag',
        key: 'addEmptyBag',
        width: 150,
        render: (value) => (
          <Text className="font-medium text-gray-700">{value ? 'Yes' : 'No' || '---'}</Text>
        ),
      },
      
    );
  }

  return columns;
};
