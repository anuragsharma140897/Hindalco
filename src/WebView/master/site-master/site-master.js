import React, { useMemo } from 'react'
import ControlledTable from '../../../Component/ControlledTable/ControlledTable'
import PageHeader from '../../../shared/page-header'
import { useModal } from '../../../shared/modal-views/use-modal';
import { useColumn } from '../../../Hooks/use-column';
import { userData } from '../../../dummyData/user-data';
import { getSiteMasterColumns } from './site-column';
import { TableClass } from '../../../Constant/Classes/Classes';
import AddSiteMaster from '../../../Form/master/site-master/add-site-master';

export default function SiteMaster() {
  const { openModal, closeModal } = useModal();
  const columns = useMemo(() => getSiteMasterColumns({ userData, openModal }))
  const { visibleColumns } = useColumn(columns);

  return (
    <div>
      <PageHeader metaTitle={'Site Master'} btnText={'Add Site'} children={<AddSiteMaster closeModal={closeModal}/>} customSize={400} />
      <ControlledTable
        variant="modern"
        isLoading={false}
        showLoadingText={true}
        data={userData}
        columns={visibleColumns}
        className={TableClass}
      />
    </div>
  )
}
