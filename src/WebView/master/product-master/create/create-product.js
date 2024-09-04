import React from 'react'
import PageHeader from '../../../../shared/page-header'
import AddProduct from '../../../../Form/master/product-master/create-product/add-product'

export default function CreateProduct() {
  return (
    <div>
      <PageHeader metaTitle={'Create Product'} disbleExport />
      <div><AddProduct/></div>
    </div>
  )
}
