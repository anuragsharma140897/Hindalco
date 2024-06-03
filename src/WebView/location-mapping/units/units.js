import React, { useMemo } from 'react'
import PageHeader from '../../../shared/page-header'
import ControlledTable from '../../../Component/ControlledTable/ControlledTable'
import { unitsData } from '../../../dummyData/units-data'
import { getUnitsColumns } from './unit-column'
import { useModal } from '../../../shared/modal-views/use-modal'
import { useColumn } from '../../../Hooks/use-column'

export default function Units() {
    const { openModal } = useModal();
    const columns = useMemo(() => getUnitsColumns({ unitsData, openModal }))
    const { visibleColumns } = useColumn(columns);


    return (
        <div>
            <PageHeader metaTitle={'Units'} btnText={'Add Units'} children={<h1>H1 Tag</h1>} />

            <ControlledTable
                variant="modern"
                isLoading={false}
                showLoadingText={true}
                data={unitsData}
                columns={columns}
                // className={TableClass}
            />
        </div>
    )
}
