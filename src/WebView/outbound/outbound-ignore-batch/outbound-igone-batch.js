import React, { useEffect, useMemo, useState } from 'react'
import { HitApi } from '../../../Store/Action/Api/ApiAction'
import { useDispatch, useSelector } from 'react-redux';
import { addBulkTags, addOrder, searchRfidTag, updateBulkTags } from '../../../Constant/Api/Api';
import { setOutboundApiJson, setOutboundInventory } from '../../../Store/Action/outbound/outbound-action';
import ControlledTable from '../../../Component/ui/table/custom-table';
import { useColumn } from '../../../Hooks/use-column';
import { useModal } from '../../../shared/modal-views/use-modal';
import { TableClass } from '../../../Constant/Classes/Classes';
import { getOutboundIgoneBatchColumns } from './outbound-ignore-batch-column';
import { Status } from '../../../Constant/Status';
import CustomButton from '../../../Component/ui/buttons/custom-button';

function OutboundIgoneBatch() {
    const { openModal, closeModal } = useModal();
    const reduxPagination = useSelector((state) => state.PaginationReducer);
    const reduxOutbound = useSelector(state => state.OutboundReducer);

    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()
    const [selectedRows, setSelectedRows] = useState([]);

    console.log("selectedRows", selectedRows);




    const onRowSelect = (row) => {
        setSelectedRows(prevSelected => {
            const isSelected = prevSelected.some(item => item.id === row.id);

            if (isSelected) {
                return prevSelected.filter(item => item.id !== row.id);
            }
            return [...prevSelected, row];
        });
    };
    function convertToOrderIDArray(selectedRows) {
        return selectedRows.map(id => ({ orderID: id }));
    }


    const columns = useMemo(() => getOutboundIgoneBatchColumns({
        openModal,
        closeModal,
        selectedRows,
        onRowSelect,
    }), [openModal, closeModal, selectedRows]);

    const { visibleColumns } = useColumn(columns);

    useEffect(() => {
        loadData()
    }, [])

    const loadData = () => {
        const json = {
            page: 1,
            limit: reduxPagination?.doc?.limit,
            search: {}
        }

        HitApi(json, searchRfidTag).then((result) => {
            console.log("searchRfidTag-----", result);
            dispatch(setOutboundInventory(result?.content))
            var oldJson = reduxOutbound?.apiJson
            console.log("oldJson", oldJson);
            var json = {
                "batchId": result?.content[0]?.batchId
            }

            console.log("json", json);
            Object.assign(oldJson, json);
            dispatch(setOutboundApiJson(oldJson));

        })
    }

    // const handleCreateOutboudnd = () =>{
    //     var json = reduxOutbound?.apiJson

    //         const updatedJson = { ...json, orderType: "OUTBOUND", orderStatus: Status.ORDER_INITIATED ,movementStatus:Status.ENTRY_MOVEMENT_STATUS,status: json?.status || 'Active',batchID :null };
    //         console.log('updatedJson',updatedJson);
    //         HitApi(updatedJson,addOrder).then((result) => {
    //             console.log("result-----",result);
    //             console.log("Orderid",result?.data?.id);
    //             if(result.status === 200){
    //                 alert(result.message)

    //                 const updateOrederIDArr = selectedRows


    //                 HitApi(updateOrederIDArr, updateBulkTags).then((result) => {
    //                     console.log("result-----",result);

    //                     if(result.status === 200){
    //                         alert(result.message)

    //                     }
    //                 })



    //             }
    //         })
    //   }


    const handleCreateOutbound = () => {
        const json = reduxOutbound?.apiJson;

        const updatedJson = {
            ...json,
            orderType: "OUTBOUND",
            orderStatus: Status.ORDER_INITIATED,
            movementStatus: Status.ENTRY_MOVEMENT_STATUS,
            status: json?.status || 'Active',
            batchID: null
        };

        console.log('updatedJson', updatedJson);

        HitApi(updatedJson, addOrder).then((result) => {
            console.log("result-----", result);
            console.log("Orderid", result?.data?.id);

            if (result.status === 200) {
                alert(result.message);

                const updateOrderIDArr = selectedRows.map(row => ({
                    ...row,
                    orderId: result?.data?.id
                }));

                HitApi(updateOrderIDArr, updateBulkTags).then((result) => {
                    console.log("result-----", result);

                    if (result.status === 200) {
                        alert(result.message);
                    }
                });
            }
        });
    };

    console.log("reduxOusvsdfcdsctbound", reduxOutbound);


    return (
        <div>
            <ControlledTable
                variant="modern"
                isLoading={false}
                showLoadingText={true}
                data={reduxOutbound?.inventories}
                columns={visibleColumns}
                className={TableClass}
            />

            <div className='flex justify-end gap-x-2 mt-3'>
            <CustomButton  text={ 'Back'} variant={'flat'} onClick={()=>window.location.pathname = '/inbond/outbound-order'}/> 
                <CustomButton type={'submit'} className={''} text={'Submit'} onClick={handleCreateOutbound} loading={loading} />

            </div>
        </div>
    )
}

export default OutboundIgoneBatch


