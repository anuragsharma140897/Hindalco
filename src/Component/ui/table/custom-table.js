import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Loader, Title } from 'rizzui';
import Table from './table';
import cn from '../../../Utils/class-names';
import { setPagination } from '../../../Store/Action/Pagination/PaginationAction';
import TablePagination from './table-pagination';
import CustomFilter from '../filter/custom-filter';

export default function ControlledTable({ columns, className, data, ApiHit, screen, isLoading, showLoadingText, disablePagination, json, setAction }) {
  const dispatch = useDispatch()
  const reduxPagination = useSelector(state => state.PaginationReducer)
  const handlePaginate = (page) => {
    var json = reduxPagination?.doc
    json.number = page
    dispatch(setPagination(json))
    if (ApiHit) ApiHit()
  }

  if (isLoading) {
    return (
      <div className="grid h-full min-h-[128px] flex-grow place-content-center items-center justify-center">
        <Loader variant="spinner" size="xl" />
        {showLoadingText ? (
          <Title as="h6" className="-me-2 mt-4 font-medium text-gray-500">
            Loading...
          </Title>
        ) : null}
      </div>
    );
  }

  return (
    <div className=''>
      <div className='my-2'>{screen ? <CustomFilter screen={screen} json={json} setAction={setAction} ApiHit={ApiHit}/> : null}</div>
      <div className="relative ">
        <Table data={data} rowKey={(record) => record.index} className={cn(className)} columns={columns} />
      </div>
      {
        !disablePagination ? <TablePagination
          current={reduxPagination?.doc?.number}
          total={reduxPagination?.doc?.totalElements}
          pageSize={reduxPagination?.doc?.limit}
          onChange={handlePaginate}
          ApiHit={ApiHit}
        // paginatorClassName={paginatorClassName}
        /> : null
      }

    </div>
  )
}
