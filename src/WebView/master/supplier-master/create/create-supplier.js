import React from 'react'
import PageHeader from '../../../../shared/page-header'
import AddSupplierMaster from '../../../../Form/master/supplier-master/add-supplier-master'

export default function CreateSupplier() {
  return (
    <div>
      <PageHeader metaTitle={'Create Supplier'} disbleExport />
      <div><AddSupplierMaster/></div>
    </div>
  )
}
