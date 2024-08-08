import React, { useState } from 'react'
import TableHeader from './table-header'
import RcTable from 'rc-table';
import Table from '../ui/table';
import cn from '../../Utils/class-names';
import TablePagination from './table-pagination';
import { isEmpty } from 'underscore';
import { useDispatch, useSelector } from 'react-redux';
import { setPagination } from '../../Store/Action/Pagination/PaginationAction';

export default function ControlledTable({ disablePagination, columns, className, tableProps, data, paginatorOptions, paginatorClassName }) {
  const dispatch = useDispatch()
  const reduxPagination = useSelector(state => state.PaginationReducer)
  const handlePaginate = (page) => {
    var json = reduxPagination?.doc
    json.current = page
    dispatch(setPagination(json))
  }
  return (
    <div className=''>
      <div className="relative ">
        <Table data={data} rowKey={(record) => record.index} className={cn(className)} columns={columns} />
      </div>
      
      {/* {disablePagination ? null : <TablePagination
        current={reduxPagination?.doc?.current}
        total={reduxPagination?.doc?.total}
        pageSize={reduxPagination?.doc?.pageSize}
        onChange={handlePaginate}
        paginatorClassName={paginatorClassName}
      />} */}
    </div>
  )
}
