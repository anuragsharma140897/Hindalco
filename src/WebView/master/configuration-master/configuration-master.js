import React, { useMemo } from 'react'
import PageHeader from '../../../shared/page-header'
import { routes } from '../../../config/routes'


function ConfigurationMaster() {
  return (
    <div>
      <PageHeader btnText={'Add Configuration'} href={routes?.panel?.master?.createConfigurationMaster} disbleExport />
    </div>
  )
}

export default ConfigurationMaster