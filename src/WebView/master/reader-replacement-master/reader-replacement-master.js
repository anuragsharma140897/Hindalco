import React, { useMemo } from 'react'
import PageHeader from '../../../shared/page-header'
import AddReaderMaster from '../../../Form/master/reader-master/add-reader-master'
import { useModal } from '../../../shared/modal-views/use-modal';
import ControlledTable from '../../../Component/ControlledTable/ControlledTable';
import { getReaderReplacementColumn } from './reader-replacement-column';
import { readerReplacementData } from '../../../dummyData/reader-replacement-data';
import { useColumn } from '../../../Hooks/use-column';
import { TableClass } from '../../../Constant/Classes/Classes';
export default function ReaderReplacementMaster() {
  const { openModal, closeModal } = useModal();
  const columns = useMemo(() => getReaderReplacementColumn({ readerReplacementData, openModal }))


  const { visibleColumns } = useColumn(columns);





  return (
    <div>
      <PageHeader metaTitle={'Reader Replacement'} btnText={'Add Reader'} children={<AddReaderMaster closeModal={closeModal} />} title={'Add Reader'} titleClass={'text-center'} customSize={700} />
      <div className='grid grid-cols-2 gap-3'>
        <ControlledTable
          variant="modern"
          isLoading={false}
          showLoadingText={true}
          data={readerReplacementData}
          columns={visibleColumns}
          className={TableClass}
        />
    
      </div>
    </div>
  )
}
