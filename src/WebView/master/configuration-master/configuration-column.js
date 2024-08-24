import { Text, Tooltip, ActionIcon } from 'rizzui';
import { HeaderCell } from '../../../Component/ui/table';
import DeletePopover from '../../../shared/delete-popover';
import PencilIcon from '../../../Constant/Icons/pencil';
import { deleteCustomer, deleteMqttConfig } from '../../../Constant/Api/Api';
import { HitApi } from '../../../Store/Action/Api/ApiAction';
import { EditScreen } from '../../../shared/edit-screen';
import AddCustomeMaster from '../../../Form/master/customer-master/add-customer-master';
import AddConfigurationMaster from '../../../Form/master/configuration-master/add-configuration-master';

export const getConfigurationMasterColumns = ({ closeModal, openModal }) => [
    {
        title: <HeaderCell title="#" />,
        dataIndex: 'index',
        key: 'index',
        width: 30,
        render: (value) => <Text>{value || '---'}</Text>,
    },
    {
        title: <HeaderCell title="Name" className={'font-extrabold'} />,
        dataIndex: 'name',
        key: 'name',
        width: 150,
        render: (value) => (
            <Text className="font-medium text-gray-700">{value || '---'}</Text>
        ),
    },
    {
        title: <HeaderCell title="Type" className={'font-extrabold'} />,
        dataIndex: 'type',
        key: 'type',
        width: 150,
        render: (value) => (
            <Text className="font-medium text-gray-700">{value || '---'}</Text>
        ),
    },
    {
        title: <HeaderCell title="Description" className={'font-extrabold'} />,
        dataIndex: 'description',
        key: 'description',
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
                    <a href={'/master/configuration/edit/'+row?.id}>
                        <PencilIcon className="h-4 w-4" />
                    </a>
                </Tooltip>
                <DeletePopover title={`Delete Customer Master`} description={`Are you sure you want to delete this employee?`}
                    onDelete={() => DeleteItem(row.id)}
                />
            </div>
        ),
    },
];


export const DeleteItem = (id) => {
    var json = { id: id }
    HitApi(json, deleteMqttConfig).then((Result) => {
        if(Result?.status === 200){
            window.location.reload()
        }
    })
}
