import React, { useEffect, useMemo } from 'react'
import PageHeader from '../../../shared/page-header'
import { useModal } from '../../../shared/modal-views/use-modal';
import ControlledTable from '../../../Component/ControlledTable/ControlledTable';
import { userData } from '../../../dummyData/user-data';
import { getUserColumns } from './user-column';
import { useColumn } from '../../../Hooks/use-column';
import { TableClass } from '../../../Constant/Classes/Classes';
import AddUserMaster from '../../../Form/master/user-master/add-user-master';
import { useDispatch, useSelector } from 'react-redux';
import { HitApi } from '../../../Store/Action/Api/ApiAction';
import { searchUser } from '../../../Constant/Api/Api';
import { CompileUserMaster } from './promiss/user-promiss';
import { setUserApiJson, setUserData } from '../../../Store/Action/user-management/user-action';
import { setPagination } from '../../../Store/Action/Pagination/PaginationAction';


export default function UserManagement() {
    const dispatch = useDispatch()
    const reduxUser = useSelector(state => state.UserReducer)
    const reduxPagination = useSelector(state => state.PaginationReducer)
    const { openModal, closeModal } = useModal();
    const columns = useMemo(() => getUserColumns({ openModal, closeModal }))
    const { visibleColumns } = useColumn(columns);

    useEffect(() => {
        if (reduxUser?.doc === null) {
            loadData('init')
        }



    }, [])

    const loadData = (type) => {
        var json = reduxUser?.searchJson
        if(type === 'init'){
            Object.assign(json,{page:1, limit : reduxPagination?.doc?.limit})
        }else{
            Object.assign(json,{page:reduxPagination?.doc?.number, limit : reduxPagination?.doc?.limit})
        }

        HitApi(json, searchUser).then((result) => {
            if (result) {
                CompileUserMaster(result).then((CompiledData) => {
                    dispatch(setUserData(CompiledData))
                    var tp = { limit : json?.limit, totalPages : CompiledData?.totalPages, number : CompiledData?.number, totalElements : CompiledData?.totalElements}
                    dispatch(setPagination(tp))
                })
            }
        })
    }

    return (
        <div>
            <PageHeader btnText={'Add User'} children={<AddUserMaster closeModal={closeModal} />} title={'Add User'} titleClass={'text-center'} customSize={700} />
            <ControlledTable
                screen={'user'}
                variant="modern"
                isLoading={false}
                showLoadingText={true}
                data={reduxUser?.doc?.content}
                columns={visibleColumns}
                className={TableClass}
                ApitHit={loadData}
            />
        </div>
    )
}
