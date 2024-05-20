import { routes } from '@/config/routes';
import { metaObject } from '@/config/site.config';
import CreateEditEmployee from '@/shared/employee/create-edit';
import PageHeader from '@/shared/page-header'
import React from 'react'

export const metadata = {
    ...metaObject('Employee'),
};

const pageHeader = {
    title: 'Employee',
    breadcrumb: [
        {
            href: routes?.panel?.employee,
            name: 'Employee',
        },
        {
            name: 'List',
        },
    ],
};

export default function index() {

    return (
        <div>
            <PageHeader title={pageHeader?.title} breadcrumb={pageHeader?.breadcrumb}>
                
            </PageHeader>

            <CreateEditEmployee />
        </div>
    )
}
