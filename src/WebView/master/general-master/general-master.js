import React from 'react'
// import PageHeader from '../../../shared/page-header'
import PageHeader from '../../../shared/page-header'


export default function GeneralMaster() {
  return (
    <div>
    <PageHeader  btnText={'Add General Master'} children={<div>Shariq</div>} title={'Add General Master'} customSize={400} />
    {/* <ControlledTable
      variant="modern"
      isLoading={false}
      showLoadingText={true}
      data={reduxSite?.doc?.content}
      columns={visibleColumns}
      className={TableClass}
    /> */}
  </div>
  )
}
