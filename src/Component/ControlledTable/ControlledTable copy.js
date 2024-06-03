import React from 'react';
import isEmpty from 'lodash/isEmpty';
import { Title, Loader } from 'rizzui';
import Table from '../ui/table';
import cn from '../../Utils/class-names';

// const TableFilter = dynamic(
//   () => import('@/components/controlled-table/table-filter'),
//   { ssr: false }
// );
// const TablePagination = dynamic(
//   () => import('@/components/controlled-table/table-pagination'),
//   { ssr: false }
// );

export default function ControlledTable({ isLoading, filterElement, filterOptions, paginatorOptions, tableFooter, showLoadingText, paginatorClassName,
  className, ...tableProps }) {
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
    <>
      {/* {!isEmpty(filterOptions) && (
        <TableFilter {...filterOptions}>{filterElement}</TableFilter>
      )} */}

      <div className="relative">
        <Table scroll={{ x: 1300 }} rowKey={(record) => record.id} className={cn(className)} {...tableProps}/>
        {tableFooter ? tableFooter : null}
      </div>

      {/* {!isEmpty(paginatorOptions) && (
        <TablePagination
          paginatorClassName={paginatorClassName}
          {...paginatorOptions}
        />
      )} */}
    </>
  );
}
