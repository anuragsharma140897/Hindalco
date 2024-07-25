import React from 'react'
import AddRole from '../../../../Form/role/add-role'

export default function AddRolesAndPermission({closeModal}) {
  return (
    <div>
        <AddRole closeModal={closeModal} />
    </div>
  )
}
