import React, { useState } from 'react'
import TableHeader from './table-header'
import RcTable from 'rc-table';
import Table from '../ui/table';
import cn from '../../Utils/class-names';
import TablePagination from './table-pagination';
import { isEmpty } from 'underscore';
import { useDispatch, useSelector } from 'react-redux';
import { setPagination } from '../../Store/Action/Pagination/PaginationAction';
import CustomFilter from '../ui/filter/custom-filter';

export default function ControlledTable({ columns, className, data, ApitHit, screen }) {
  const dispatch = useDispatch()
  const reduxPagination = useSelector(state => state.PaginationReducer)
  const handlePaginate = (page) => {


    var json = reduxPagination?.doc
    json.number = page
    dispatch(setPagination(json))
    if (ApitHit) ApitHit()
  }

  return (
    <div className=''>
      <div className='my-2'>{screen ? <CustomFilter screen={screen}/> : null}</div>
      <div className="relative ">
        <Table data={data} rowKey={(record) => record.index} className={cn(className)} columns={columns} />
      </div>

      <TablePagination
        current={reduxPagination?.doc?.number}
        total={reduxPagination?.doc?.totalElements}
        pageSize={reduxPagination?.doc?.limit}
        onChange={handlePaginate}
        ApitHit={ApitHit}
      // paginatorClassName={paginatorClassName}
      />

    </div>
  )
}
