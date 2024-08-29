import React, { useEffect, useMemo, useState } from 'react'
import ControlledTable from '../../../Component/ui/table/custom-table'
import { getOutboundBatchColumns } from './outbound-batch-column';
import { useModal } from '../../../shared/modal-views/use-modal';
import { useColumn } from '../../../Hooks/use-column';
import { useDispatch, useSelector } from 'react-redux';
import { TableClass } from '../../../Constant/Classes/Classes';
import { HitApi } from '../../../Store/Action/Api/ApiAction';
import { addOrder, searchBatch, updateOrder } from '../../../Constant/Api/Api';
import { setBuldingBatch, setOutboundApiJson } from '../../../Store/Action/outbound/outbound-action';
import CustomButton from '../../../Component/ui/buttons/custom-button';
import { Status } from '../../../Constant/Status';

function OutboundBatch() {
    const { openModal, closeModal } = useModal();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false)
    const reduxPagination = useSelector((state) => state.PaginationReducer);
    const reduxOutbound = useSelector(state => state.OutboundReducer);

    const [selectedRow, setSelectedRow] = useState(reduxOutbound?.apiJson?.batchId || null);

    let isEdit = false
    if (window.location.pathname.split('/')[2] === 'outbound-edit') {
        isEdit = true
    }




    const onRowSelect = (id) => {
        setSelectedRow(id);
        console.log("Selected row:", id)

        var oldJson = reduxOutbound?.apiJson

        console.log("oldJson", oldJson);
        var json = {
            "batchId": id
        }
        Object.assign(oldJson, json)
        dispatch(setOutboundApiJson(oldJson));
    };

    const columns = useMemo(() => getOutboundBatchColumns({ openModal, closeModal, loading, setLoading, selectedRow, onRowSelect }), [openModal, closeModal, loading, selectedRow]);
    const { visibleColumns } = useColumn(columns);

    useEffect(() => {
        loadData()
    }, [])


    const loadData = () => {

        const json = {
            page: 1,
            limit: reduxPagination?.doc?.limit,
            search: {
                "buildingId": reduxOutbound?.apiJson?.dispatchFrom
            }
        }

        HitApi(json, searchBatch).then((result) => {
            console.log("result11", result);
            dispatch(setBuldingBatch(result?.content))
        })
    }

    const onSubmit = () => {
        setLoading(true)
        var json = reduxOutbound?.apiJson
        const apiTohit = isEdit ? updateOrder : addOrder

        const updatedJson = { ...json, orderType: "OUTBOUND", orderStatus: Status.ORDER_INITIATED, movementStatus: Status.ENTRY_MOVEMENT_STATUS, status: json?.status || 'Active', id: json?._id };
        console.log("updatedJson-----", updatedJson);

        HitApi(updatedJson, apiTohit).then((result) => {
            console.log("result-----", result);
            setLoading(false)
            if (result.status === 200) {
                alert(result.message)
                window.location.pathname = '/outbond/outbound-order'
            }
        })

    }

    console.log("reduxOutbound-----", reduxOutbound);


    console.log("selectedRow", selectedRow);
    return (
        <div>
            <ControlledTable variant="modern" isLoading={false} showLoadingText={true} data={reduxOutbound?.builddingBatch} columns={visibleColumns} className={TableClass} />
            {
                reduxOutbound?.apiJson?.batchId &&
                <div className='flex justify-end mt-3 gap-x-2'>
                    <CustomButton text={'Back'} variant={'flat'} onClick={() => window.location.pathname = '/inbond/outbound-order'} />
                    <CustomButton type={'submit'} text={isEdit ? 'Update' : 'Submit'} onClick={onSubmit} loading={loading} />
                </div>
            }
        </div>
    )
}

export default OutboundBatch