import { Text, Tooltip, ActionIcon } from 'rizzui';
import { HeaderCell } from '../../../Component/ui/table';
import DeletePopover from '../../../shared/delete-popover';
import PencilIcon from '../../../Constant/Icons/pencil';
import AddSiteMaster from '../../../Form/master/site-master/add-site-master';
import { EditScreen } from '../../../shared/edit-screen';
import { HitApi } from '../../../Store/Action/Api/ApiAction';
import { deleteSite, searchBuilding } from '../../../Constant/Api/Api';
import { getFormattedDate } from '../../../Utils/Utils';
import { useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import useAlertController from '../../../Hooks/use-alert-controller';
import TableActions from '../../../Component/ui/table/TableActions';

export const GetConfigurationColumns = () => {
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
    //   console.log('Unexpected error:', err);
    // } finally {
    //   setLoadingRows((prev) => ({ ...prev, [row.index]: false }));
    // }
    
  };

  const renderCell = (value, row, content) => (
    loadingRows[row.index] ? <Skeleton /> : content
  );

  return [
    {
      title: <HeaderCell title="#" />,
      dataIndex: 'index',
      key: 'index',
      width: 10,
      render: (value, row, index) => renderCell(value, row, <Text>{index + 1 || '---'}</Text>),
    },
    {
      title: <HeaderCell title="Config Name" className="font-extrabold" />,
      dataIndex: 'configName',
      key: 'configName',
      width: 100,
      render: (value, row) => renderCell(value, row, (
        <Text className="font-medium text-gray-700">{value || '---'}</Text>
      )),
    },
    {
      title: <HeaderCell title="Use For" className="font-extrabold" />,
      dataIndex: 'useFor',
      key: 'useFor',
      width: 100,
      render: (value, row) => renderCell(value, row, (
        <Text className="font-medium text-gray-700">{value || '---'}</Text>
      )),
    },
    {
      title: <HeaderCell title="Actions" className="font-extrabold" />,
      dataIndex: 'action',
      key: 'action',
      width: 300,
      render: (_, row) => renderCell(null, row, (
        <TableActions
          screen={'siteMaster'}
          row={row}
          onEdit={(rowData) => {}}
          onView={(rowData) => console.log('View action for', rowData)} // replace with actual view logic
          onDelete={(rowData) => handleDelete(rowData)}
          checkKeys={['useBy']}
        />
      )),
    },
  ];
};
