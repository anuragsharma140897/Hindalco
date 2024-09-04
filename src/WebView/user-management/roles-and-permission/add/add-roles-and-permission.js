import React from 'react'
import AddRole from '../../../../Form/role/add-role'

export default function AddRolesAndPermission({closeModal, row}) {
  return (
    <div>
        <AddRole closeModal={closeModal} row={row}/>
    </div>
  )
}
