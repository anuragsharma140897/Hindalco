import Image from "next/image";
import { Inter } from "next/font/google";
import { orderData } from "@/dummyData/order-data";
import PageHeader from "@/shared/page-header";
import ExportButton from "@/shared/export-button";
import { metaObject } from "@/config/site.config";
import { routes } from "@/config/routes";
import EmployeeTable from "@/shared/employee/employee-table";
import { Metadata } from 'next';
import { HitApi } from "@/redux/action/api/api-action";
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from "react";
import { GetRoads } from "@/constants/constant";
import { setRoads } from "@/redux/action/roads/roads-action";
import { CompileRoadData } from "@/promiss/roads/roads-promiss";

const inter = Inter({ subsets: ["latin"] });

// export const metadata = {
//     ...metaObject('Roads'),
// };

export const metadata = {
    title: 'New Page | Isomorphic Furyroad',
};

const pageHeader = {
    title: 'Roads',
    breadcrumb: [
        {
            href: routes.eCommerce.dashbaord,
            name: 'Roads',
        },
        {
            name: 'List',
        },
    ],
};

export default function Roads() {

    const dispatch = useDispatch();
    const reduxRoads = useSelector(state => state.RoadReducer)


    useEffect(() => {
        if (reduxRoads?.doc === null) {
            loadData()
        }

        

    }, [])

    console.log('reduxRoads', reduxRoads?.doc);

    const loadData = () => {
        var json = reduxRoads?.json
        
        HitApi(json, GetRoads).then((res) => {
            if (res?.doc?.docs) {
                CompileRoadData(res?.doc).then((Result) => {
                    dispatch(setRoads(Result))
                })

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
                </div>
            </PageHeader>
            <div>
                {/* <EmployeeTable data={reduxRoads?.doc?.docs || []} /> */}
                {reduxRoads?.doc?.docs?<EmployeeTable data={reduxRoads?.doc?.docs} />: null}
            </div>
        </div>
    );
}
