import React, { useEffect, useMemo, useState } from 'react'
import { useModal } from '../../../shared/modal-views/use-modal';
import { useColumn } from '../../../Hooks/use-column';
import { useDispatch, useSelector } from 'react-redux';
import { getRolesAndPermissionColumns } from './roles-and-permission-column';
import ControlledTable from '../../../Component/ControlledTable/ControlledTable';
import { TableClass } from '../../../Constant/Classes/Classes';
import PageHeader from '../../../shared/page-header';
import { roleData } from '../../../dummyData/role-and-permission-data';
import { Badge, Text, Title } from 'rizzui';
import AddRolesAndPermission from './add/add-roles-and-permission';
import { HitApi } from '../../../Store/Action/Api/ApiAction';
import { searchRole } from '../../../Constant/Api/Api';
import { setRolesAndPermissionMainData } from '../../../Store/Action/RolesAndPermission/RolesAndPermissionAction';
import { CompileRolesAndPermission } from './promiss/roles-and-permission.promiss';
import data from './data.json'

export const PermissionTypes = () => {
  return <div className='flex items-center gap-5'>
    <div><Title as="h6"> Permission Types </Title></div>
    <div className='flex gap-4 my-4'>
      <div className="flex items-center ">
        <Badge renderAsDot className="bg-yellow-500" />
        <Text className="ms-2 font-medium capitalize text-gray-600"> Read </Text>
      </div>
      <div className="flex items-center">
        <Badge renderAsDot className="bg-green-500" />
        <Text className="ms-2 font-medium capitalize text-gray-600"> Write </Text>
      </div>
      <div className="flex items-center">
        <Badge renderAsDot className="bg-red-500" />
        <Text className="ms-2 font-medium capitalize text-gray-600"> Delete </Text>
      </div>
    </div>
  </div>
}

export default function RolesAndPermission() {
  const { openModal, closeModal } = useModal();
  const dispatch = useDispatch()
  const reduxRolesAndPermission = useSelector(state => state.RolesAndPermissionReducer)
  let rd = reduxRolesAndPermission?.mainData || []
  const columns = useMemo(() => getRolesAndPermissionColumns({ openModal, closeModal }))

  const { visibleColumns } = useColumn(columns);
  const reduxPagination = useSelector(state => state.PaginationReducer)

  useEffect(() => {
    if (reduxRolesAndPermission?.mainData === null) {
      loadData()
    }

  }, [])

  const loadData = () => {
    var json = reduxRolesAndPermission?.searchJson

    // HitApi(json, searchRole).then((result) => {
    //   if (result?.content?.length > 0)
    //     CompileRolesAndPermission(result).then((CompiledData) => {
    //       dispatch(setRolesAndPermissionMainData(CompiledData))
    //     })
    // })

  }

  return (
    <div>
      <PageHeader btnText={'Add Role'} children={<AddRolesAndPermission closeModal={closeModal} />} customSize={800} title={'Add Roles and Permission'} />
      <PermissionTypes />
      <ControlledTable
        variant="modern"
        isLoading={false}
        showLoadingText={true}
        data={reduxRolesAndPermission?.mainData?.docs}
        columns={visibleColumns}
        className={TableClass}
      />
    </div>
  )
}
