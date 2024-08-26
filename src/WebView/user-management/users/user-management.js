import React, { useEffect, useMemo, useState } from 'react';
import PageHeader from '../../../shared/page-header';
import { useModal } from '../../../shared/modal-views/use-modal';
import { GetUserColumns } from './user-column';
import { useColumn } from '../../../Hooks/use-column';
import { TableClass } from '../../../Constant/Classes/Classes';
import AddUserMaster from '../../../Form/master/user-master/add-user-master';
import { useDispatch, useSelector } from 'react-redux';
import { HitApi } from '../../../Store/Action/Api/ApiAction';
import { searchUser } from '../../../Constant/Api/Api';
import { CompileUserMaster } from './promiss/user-promiss';
import { setUserApiJson, setUserData } from '../../../Store/Action/user-management/user-action';
import { setPagination } from '../../../Store/Action/Pagination/PaginationAction';
import CustomTable from '../../../Component/ui/table/custom-table';
import { ScreenName } from '../../../Constant/Screen/Screen';

export default function UserManagement() {
    const dispatch = useDispatch();
    const reduxUser = useSelector(state => state.UserReducer);
    const reduxPagination = useSelector(state => state.PaginationReducer);
    const { openModal, closeModal } = useModal();

    const loadData = (type) => {
        let json = reduxUser?.searchJson;

        if (type === 'init') {
            Object.assign(json, { page: 1, limit: reduxPagination?.doc?.limit });
        } else {
            Object.assign(json, { page: reduxPagination?.doc?.number, limit: reduxPagination?.doc?.limit });
        }

        console.log('json', json);

        HitApi(json, searchUser).then((result) => {
            if (result?.success !== false) {
                CompileUserMaster(result).then((compiledData) => {
                    dispatch(setUserData(compiledData));
                    dispatch(setPagination({
                        limit: json?.limit,
                        totalPages: compiledData?.totalPages,
                        number: compiledData?.number,
                        totalElements: compiledData?.totalElements,
                    }));
                });
            }
        });
    };

    // Memoized columns for table
    const columns = useMemo(() => GetUserColumns(openModal, closeModal, loadData), [openModal, closeModal, loadData]);
    const { visibleColumns } = useColumn(columns);

    // Initial data load on component mount
    useEffect(() => {
        if (reduxUser?.doc === null) {
            loadData('init');
        }
    }, [reduxUser]);

    return (
        <div>
            <PageHeader
                screen={ScreenName?.user}
                btnText={'Add User'}
                children={<AddUserMaster closeModal={closeModal} ApiHit={loadData} />}
                title={'Add User'}
                titleClass={'text-center'}
                customSize={700}
            />
            <CustomTable
                screen={ScreenName?.user}
                variant="modern"
                showLoadingText={true}
                data={reduxUser?.doc?.content}
                columns={visibleColumns}
                className={TableClass}
                json={reduxUser?.searchJson}
                setAction={setUserApiJson}
                ApiHit={loadData}
            />
        </div>
    );
}
