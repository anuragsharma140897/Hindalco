import React from 'react'
import PageHeader from '../../../../shared/page-header'
import AddCustomeMaster from '../../../../Form/master/customer-master/add-customer-master'

export default function CreateCustomer() {
  return (
    <div>
      <PageHeader metaTitle={'Create Customer'} disbleExport />
      <div><AddCustomeMaster/></div>
    </div>
  )
}
