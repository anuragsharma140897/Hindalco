import React, { useMemo } from 'react'
import PageHeader from '../../../shared/page-header'
import AddConfigurationMaster from '../../../Form/master/configuration-master/add-configuration-master'
import { useModal } from '../../../shared/modal-views/use-modal';
import { getGeneralMasterColumns } from '../general-master/general-column';
import { useColumn } from '../../../Hooks/use-column';


function ConfigurationMaster() {
  const { openModal, closeModal } = useModal();
  const columns = useMemo(() => getGeneralMasterColumns({ openModal, closeModal }))
  const { visibleColumns } = useColumn(columns);
  return (
    <div>
            <PageHeader btnText={'Add Configuration'} children={<AddConfigurationMaster closeModal={closeModal} />} title={'Add Configuration'} customSize={400} />

    </div>
  )
}

export default ConfigurationMaster