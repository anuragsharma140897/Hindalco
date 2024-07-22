import React, { useMemo } from 'react'
import PageHeader from '../../../shared/page-header'
import ControlledTable from '../../../Component/ControlledTable/ControlledTable'
import { useModal } from '../../../shared/modal-views/use-modal'
import { useColumn } from '../../../Hooks/use-column'
import { getReaderMasterColumns } from './reader-column'
import { TableClass } from '../../../Constant/Classes/Classes'
import AddBuildingMaster from '../../../Form/master/building-master/add-building-master'
import { buildingData } from '../../../dummyData/building-data'
import { readerData } from '../../../dummyData/reader-data'
import AddReaderMaster from '../../../Form/master/reader-master/add-reader-master'

export default function ReaderMaster() {

  const { openModal, closeModal } = useModal();
  const columns = useMemo(() => getReaderMasterColumns({ readerData, openModal }))
  const { visibleColumns } = useColumn(columns);

  return (
    <div>
      <PageHeader metaTitle={'Reader Master'} btnText={'Add Reader'} children={<AddReaderMaster closeModal={closeModal} />} title={'Add Reader'} titleClass={'text-center'} customSize={700} />
      <ControlledTable
        variant="modern"
        isLoading={false}
        showLoadingText={true}
        data={readerData}
        columns={visibleColumns}
        className={TableClass}
      />
    </div>
  )
}
