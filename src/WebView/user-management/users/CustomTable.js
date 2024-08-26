// ControlledTable.jsx
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Loader, Title } from 'rizzui';
import Table from './table';
import cn from '../../../Utils/class-names';

export default function ControlledTable({ columns, className, data, ApiHit, screen, isLoading, showLoadingText, disablePagination }) {
    const dispatch = useDispatch();
    const reduxPagination = useSelector(state => state.PaginationReducer);

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
            {/* Optionally render the filter component if `screen` prop is provided */}
            {/* <div className='my-2'>{screen ? <CustomFilter screen={screen} DynamicFilterData={DynamicFilterData}/> : null}</div> */}
            <div className="relative">
                {/* Render the table with data and columns */}
                <Table
                    data={data}
                    rowKey={(record) => record.index}
                    className={cn(className)}
                    columns={columns}
                />
            </div>

        </div>
    );
}
