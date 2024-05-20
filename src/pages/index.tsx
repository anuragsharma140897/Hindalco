import Image from "next/image";
import { Inter } from "next/font/google";
import { Button, Title } from "rizzui";
import BasicTableWidget from "@/components/controlled-table/basic-table-widget";
import { orderData } from "@/dummyData/order-data";
import { getWidgetColumns } from "@/constants/columns";
import PageHeader from "@/shared/page-header";
import ExportButton from "@/shared/export-button";
import Link from "next/link";
import { metaObject } from "@/config/site.config";
import { routes } from "@/config/routes";
import { PiPlusBold } from "react-icons/pi";
import ControlledTable from "@/components/controlled-table";
import { useColumn } from "@/hooks/use-column";
import EmployeeTable from "@/shared/employee/employee-table";

const inter = Inter({ subsets: ["latin"] });
export const metadata = {
  ...metaObject('Employee'),
};

const pageHeader = {
  title: 'Employee',
  breadcrumb: [
    {
      href: routes.eCommerce.dashbaord,
      name: 'Employee',
    },
    {
      name: 'List',
    },
  ],
};

export default function Home() {

  return (
    <div>
      <PageHeader title={pageHeader?.title} breadcrumb={pageHeader?.breadcrumb}>
        <div className="mt-4 flex items-center gap-3 @lg:mt-0">
          <ExportButton
            data={orderData || []}
            fileName="employee_data"
            header="ID,Name,Category,Product Thumbnail,SKU,Stock,Price,Status,Rating"
          />
          <Link
            href={routes?.eCommerce?.dashbaord}
            className="w-full @lg:w-auto"
          >
            <Button as="span" className="w-full @lg:w-auto">
              <PiPlusBold className="me-1.5 h-[17px] w-[17px]" />
              Add Employee
            </Button>
          </Link>
        </div>
      </PageHeader>
      <div>
        <EmployeeTable data={orderData} />
      </div>
    </div>
  );
}
