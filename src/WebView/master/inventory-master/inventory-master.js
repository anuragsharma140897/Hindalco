import React from 'react'
import PageHeader from "../../../shared/page-header";
import AddInventoryMaster from '../../../Form/master/inventory-master/add-inventory-master';
import { useModal } from '../../../shared/modal-views/use-modal';
import { useSelector } from 'react-redux';


function InventoryMaster() {
  const reduxUser = useSelector(state => state.UserMasterReducer)

  const { openModal, closeModal } = useModal();

  return (
    <div>
      <PageHeader btnText={'Add Batch'} children={<AddInventoryMaster closeModal={closeModal} />} title={'Add Batch'} customSize={400} />
    </div>
  )
}

export default InventoryMaster 
