import Image from "next/image";
import { Inter } from "next/font/google";
import { orderData } from "@/dummyData/order-data";
import PageHeader from "@/shared/page-header";
import ExportButton from "@/shared/export-button";
import { metaObject } from "@/config/site.config";
import { routes } from "@/config/routes";
import EmployeeTable from "@/shared/employee/employee-table";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {  getEmployeeData } from "@/constants/constant";
import { HitApi } from "@/redux/action/api/api-action";
import { setEmployeeData } from "@/redux/action/employee/employee-action";
import { PiPlusBold } from "react-icons/pi";
import { Button } from "rizzui";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });
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

export default function CompactionReport() {

    const dispatch = useDispatch();
    const reduxEmployee = useSelector(state => state.EmployeeReducer)

    useEffect(() => {
        if (reduxEmployee?.doc === null) {
            loadData()
        }
    }, [])

    const loadData = () => {
        var json = reduxEmployee?.json
        HitApi(json, getEmployeeData).then((res) => {
            console.log('res', res);
            if (res?.doc?.docs) {
                dispatch(setEmployeeData(res?.doc))
            }
        })
    }

    return (
        <div>
            <PageHeader title={pageHeader?.title} breadcrumb={pageHeader?.breadcrumb}>
                <div className="mt-4 flex items-center gap-3 @lg:mt-0">
                    <ExportButton
                        data={orderData || []}
                        fileName="employee_data"
                        header="ID,Name,Category,Product Thumbnail,SKU,Stock,Price,Status,Rating"
                    />
                    <Link href={routes?.panel?.addemployee} className="w-full @lg:w-auto">
                        <Button as="span" className="w-full @lg:w-auto">
                            <PiPlusBold className="me-1.5 h-[17px] w-[17px]" />
                            Add Employee
                        </Button>
                    </Link>
                </div>
            </PageHeader>
            <div>
                {reduxEmployee?.doc?.docs?<EmployeeTable data={reduxEmployee?.doc?.docs} /> : null}
            </div>
        </div>
    );
}
