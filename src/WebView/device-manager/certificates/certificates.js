import React from 'react'
import PageHeader from './component/page-header'
import { routes } from '../../../config/routes'

export default function Certificates() {
  return (
    <div>
        <PageHeader btnText={'Add Certificate'} href={routes?.panel?.deviceManager?.addCertificates}/>
    </div>
  )
}
