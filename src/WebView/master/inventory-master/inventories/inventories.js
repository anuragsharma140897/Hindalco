import React, { useEffect, useMemo, useState } from 'react';
import { HitApi } from '../../../../Store/Action/Api/ApiAction';
import { useDispatch, useSelector } from 'react-redux';
import { searchBatch, searchRfidTag } from '../../../../Constant/Api/Api';
import { setInventoryMasterData } from '../../../../Store/Action/master/inventory-master/inventory-master-action';
import { setPagination } from '../../../../Store/Action/Pagination/PaginationAction';
import { CompileInventoryMaster } from '../promise/inventory-master-promise';
import { TableClass } from '../../../../Constant/Classes/Classes';
import ControlledTable from '../../../../Component/ControlledTable/ControlledTable';
import { useModal } from '../../../../shared/modal-views/use-modal';
import { useColumn } from '../../../../Hooks/use-column';
import { InventoriesColumn } from './InventoriesColumn';
import { CompileInventories } from './promise/inventories-promise';
import { setInventriesJson } from '../../../../Store/Action/Inventories/InventoriesAction';

function Inventories() {
    const { openModal, closeModal } = useModal();
    const [loading, setLoading] = useState(false);
    const reduxInventories = useSelector(state => state.InventoryReducer);
    const reduxInventory = useSelector(state => state.InventoryMasterReducer)


    const columns = useMemo(() => InventoriesColumn({ openModal, closeModal,reduxInventory}))

    const { visibleColumns } = useColumn(columns);

 


    const dispatch = useDispatch();

    const getIdFromPathname = () => {
        const pathname = window.location.pathname;
        const segments = pathname.split('/');
        return segments.pop(); 
    };

    const id = getIdFromPathname();

    useEffect(() => {
        loadData();
        getSingleDataFromId()
    }, [id]);

    const loadData = () => {
        const json = { page: 1, limit: 100, search: { batchId: id } };

        HitApi(json, searchRfidTag).then((result) => {
            if (result) {
                CompileInventories(result).then((compiledData) => {
                    dispatch(setInventriesJson(compiledData));
                    const paginationData = {
                        limit: json.limit,
                        totalPages: compiledData.totalPages,
                        number: compiledData.number,
                        totalElements: compiledData.totalElements
                    };
                    dispatch(setPagination(paginationData));
                });
            }
        });
    };

    const getSingleDataFromId = () =>{
        const json = { page: 1, limit: 100, search: { id: id } };

        HitApi(json, searchBatch).then((result) => {
            if (result) {
                CompileInventoryMaster(result).then((compiledData) => {
                    dispatch(setInventoryMasterData(compiledData))
                    const paginationData = {
                        limit: json.limit,
                        totalPages: compiledData.totalPages,
                        number: compiledData.number,
                        totalElements: compiledData.totalElements
                    };
                    dispatch(setPagination(paginationData));
                });
            }
        });

    }


    console.log("reduxInventory______",reduxInventory?.doc?.content);

    console.log("reduxInventories",reduxInventories);
    return (
        <div>
            <div className='text-xl font-bold mb-10'>{reduxInventory?.doc?.content[0]?.batchName} Inventories</div>
            <ControlledTable
                variant="modern"
                isLoading={false}
                showLoadingText={true}
                data={reduxInventories?.doc?.content}
                columns={visibleColumns}
                className={TableClass}
                ApitHit={loadData}
            />
        </div>
    );
}

export default Inventories;
