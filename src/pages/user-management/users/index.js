import { routes } from '@/config/routes';
import { metaObject } from '@/config/site.config';
import ExportButton from '@/shared/export-button';
import PageHeader from '@/shared/page-header'
import { Inter } from 'next/font/google';
import Link from 'next/link';
import React from 'react'
import { PiPlusBold } from 'react-icons/pi';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'rizzui';

import MyComponent from 'headsup-npm-test';
import { userData } from '@/dummyData/user-data';
import UserTable from './UserTable';
 


const inter = Inter({ subsets: ["latin"] });
export const metadata = {
  ...metaObject('Employee'),
};

const pageHeader = {
  title: 'User Management',
  breadcrumb: [
    {
      href: routes?.panel?.userManagement?.users,
      name: 'Users',
    },
    {
      name: 'List',
    },
  ],
};

export default function index() {
  const dispatch = useDispatch();
  const reduxEmployee = useSelector(state => state.EmployeeReducer)

  return (
    <div>
      <PageHeader title={pageHeader?.title} breadcrumb={pageHeader?.breadcrumb}>
        <div className="mt-4 flex items-center gap-3 @lg:mt-0">
          <ExportButton
            data={[]}
            fileName="employee_data"
            header="ID,Name,Category,Product Thumbnail,SKU,Stock,Price,Status,Rating"
          />
          <Link href={routes?.panel?.addemployee || '#'} className="w-full @lg:w-auto">
            <Button as="span" className="w-full @lg:w-auto">
              <PiPlusBold className="me-1.5 h-[17px] w-[17px]" />
              Add User
            </Button>
          </Link>
        </div>
      </PageHeader>

      <div>
        <UserTable data={userData}/>
      </div>
    </div>
  )
}
