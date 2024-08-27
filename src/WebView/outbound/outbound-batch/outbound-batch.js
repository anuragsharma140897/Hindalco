import React, { useEffect, useMemo, useState } from 'react'
import ControlledTable from '../../../Component/ui/table/custom-table'
import { getOutboundBatchColumns } from './outbound-batch-column';
import { useModal } from '../../../shared/modal-views/use-modal';
import { useColumn } from '../../../Hooks/use-column';
import { useDispatch, useSelector } from 'react-redux';
import { TableClass } from '../../../Constant/Classes/Classes';
import { HitApi } from '../../../Store/Action/Api/ApiAction';
import { searchBatch } from '../../../Constant/Api/Api';
import { setBuldingBatch, setOutboundApiJson } from '../../../Store/Action/outbound/outbound-action';

function OutboundBatch() {
    const { openModal, closeModal } = useModal();
    const dispatch = useDispatch();
    const [loading,setLoading] = useState(false)
    const reduxPagination = useSelector((state) => state.PaginationReducer);
    const reduxOutbound = useSelector(state => state.OutboundReducer);

    const [selectedRow, setSelectedRow] = useState(null);


    const onRowSelect = (id) => {
        setSelectedRow(id);
        console.log("Selected row:", id)

        var oldJson = reduxOutbound?.apiJson

        console.log("oldJson",oldJson);
        var json ={
            "batchId" :id
        }
        Object.assign(oldJson,json)
        dispatch(setOutboundApiJson(oldJson));    
    };


    const columns = useMemo(() => getOutboundBatchColumns({ 
        openModal, 
        closeModal, 
        loading, 
        setLoading,
        selectedRow,
        onRowSelect
    }), [openModal, closeModal, loading, selectedRow]);
    const { visibleColumns } = useColumn(columns);

    useEffect(() => {
        loadData()
    }, [])


    const loadData = () =>{

        const json = {
         page :1,
         limit : reduxPagination?.doc?.limit,
         search: {
            "buildingId":reduxOutbound?.apiJson?.dispatchFrom
         }
        }

        HitApi(json,searchBatch).then((result)=>{
            console.log("result11",result);
            dispatch(setBuldingBatch(result?.content))
        })
    }

    console.log("reduxOutbound-----",reduxOutbound);
    return (
        <div>
            <ControlledTable variant="modern" isLoading={false} showLoadingText={true} data={reduxOutbound?.builddingBatch} columns={visibleColumns} className={TableClass} />
        </div>
    )
}

export default OutboundBatch