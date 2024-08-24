import { Text } from "rizzui";
import { HeaderCell } from "../../../../Component/ui/table";
import { removeZoneFromLocation } from "../../../../Constant/Api/Api";
import { HitApi } from "../../../../Store/Action/Api/ApiAction";

export const getzoneLocationMasterColumns = ({ zoneid }) => {
    console.log("zoneid", zoneid);

    const columns = [
        {
            title: <HeaderCell title="#" />,
            dataIndex: 'index',
            key: 'index',
            width: 30,
            render: (_, __, index) => <Text>{index + 1}</Text>,
        },
        {
            title: <HeaderCell title="Location Name" className="font-extrabold" />,
            dataIndex: 'value',
            key: 'value',
            width: 150,
            render: (value) => <Text className="font-medium text-gray-700">{value || '---'}</Text>,
        },
        {
            title: <HeaderCell title="Status" className="font-extrabold" />,
            dataIndex: 'status',
            key: 'status',
            width: 150,
            render: (value) => <Text className="font-medium text-gray-700">{value || '---'}</Text>,
        },
        {
            title: <HeaderCell title="Actions" className="font-extrabold" />,
            dataIndex: 'action',
            key: 'action',
            width: 130,
            render: (_, row) => (
                <div className="flex">
                    <div onClick={() => DeleteItem(row.id, zoneid)} className="border px-2 py-1 rounded cursor-pointer" ><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                    </svg>
                    </div>
                </div>
            ),
        },
    ];

    return columns;
};

export const DeleteItem = (id, zoneid) => {

    var json = {
        mapTo: id,
        sourceId: zoneid,

    }


    HitApi(json, removeZoneFromLocation)
        .then((result) => {
            console.log('result', result);
            if (result && result.status === 200) {
                alert('Zone deleted successfully');
                window.location.pathname = '/master/location'
            } else {
                alert('Failed to delete the zone');
            }
        })
        .catch((error) => {
            console.error('Error deleting item:', error);
            alert('An error occurred while deleting the zone.');
        })



};
