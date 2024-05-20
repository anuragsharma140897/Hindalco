'use client';

import Link from 'next/link';
import { HeaderCell } from '@/components/ui/table';
import { Badge, Text, Tooltip, ActionIcon } from 'rizzui';
import { routes } from '@/config/routes';
import EyeIcon from '@/components/icons/eye';
import PencilIcon from '@/components/icons/pencil';
import TableAvatar from '@/components/ui/avatar-card';
import DateCell from '@/components/ui/date-cell';
import DeletePopover from '@/shared/delete-popover';
import { columns } from './columns';


function getStatusBadge(status: string) {

  var t_status = status === 'No Device Found' || status === 'No KML Data' ? 'danger' : 'completed'

  switch (t_status) {
    case 'completed':
      return (
        <div className="flex items-center">
          <Text className="ms-2 font-medium text-green-dark text-center">{status}</Text>
        </div>
      );
    case 'danger':
      return (
        <div className="flex items-center">
          <Text className="ms-2 font-medium text-red-dark">{status}</Text>
        </div>
      );
    default:
      return (
        <div className="flex items-center">
          <Badge renderAsDot className="bg-gray-400" />
          <Text className="ms-2 font-medium text-gray-600">{status}</Text>
        </div>
      );
  }
}

type Columns = {
  sortConfig?: any;
  onDeleteItem: (id: string) => void;
  onHeaderCellClick: (value: string) => void;
  onChecked?: (event: React.ChangeEvent<HTMLInputElement>, id: string) => void;
};
export const getEmployeeColumns = ({ sortConfig, onDeleteItem, onHeaderCellClick, }: Columns) => [ { title:
  <HeaderCell title="SR No." sortable ascending={ sortConfig?.direction==='asc' && sortConfig?.key==='index' } />, onHeaderCell: () => onHeaderCellClick('index'), dataIndex: 'index', key: 'index', width: 120, render: (value: string) => <Text>#{value || '---'}</Text>, }, { title:
  <HeaderCell title="Emp ID" />, dataIndex: 'emp_id', key: 'DISTRICT_NAME', width: 150, render: (value: string) => ( <Text className="font-medium text-gray-700">{value || '---'}</Text> ), }, { title:
  <HeaderCell title="Full Name" />, onHeaderCell: () => onHeaderCellClick('firstName'), dataIndex: 'firstName', key: 'firstName', width: 150, render: (value: string) => ( <Text className="font-medium text-gray-700">{value || '---'}</Text> ), }, { title:
  <HeaderCell title="Email" />, onHeaderCell: () => onHeaderCellClick('email'), dataIndex: 'email', key: 'email', width: 150, render: (value: string) => ( <Text className="font-medium text-gray-700">{value || '---'}</Text> ), }, { title:
  <HeaderCell title="Contact" />, onHeaderCell: () => onHeaderCellClick('contact'), dataIndex: 'contact', key: 'contact', width: 150, render: (value: string) => ( <Text className="font-medium text-gray-700">{value || '---'}</Text> ), }, { title:
  <HeaderCell title="Gender" />, onHeaderCell: () => onHeaderCellClick('gender'), dataIndex: 'gender', key: 'gender', width: 150, render: (value: string) => ( <Text className="font-medium text-gray-700">{value || '---'}</Text> ), }, { title:
  <HeaderCell title="DOB" />, onHeaderCell: () => onHeaderCellClick('firstName'), dataIndex: 'firstName', key: 'firstName', width: 150, render: (value: string) => ( <Text className="font-medium text-gray-700">{value || '---'}</Text> ), }, { title:
  <HeaderCell title="DOJ" />, onHeaderCell: () => onHeaderCellClick('joiningDate'), dataIndex: 'joiningDate', key: 'joiningDate', width: 150, render: (value: string) => ( <Text className="font-medium text-gray-700">{value || '---'}</Text> ), }, { title:
  <HeaderCell title="Team Name" />, onHeaderCell: () => onHeaderCellClick('joiningDate'), dataIndex: 'joiningDate', key: 'joiningDate', width: 150, render: (value: string) => ( <Text className="font-medium text-gray-700">{value || '---'}</Text> ), }, { title:
  <HeaderCell title="Status" />, onHeaderCell: () => onHeaderCellClick('currentStatus'), dataIndex: 'currentStatus', key: 'currentStatus', width: 150, render: (value: string) => ( <Text className="font-medium text-gray-700">{value || '---'}</Text> ), }, { title:
  <HeaderCell title="Actions" className="opacity-0" />, dataIndex: 'action', key: 'action', width: 130, render: (_: string, row: any) => ( <div className="flex items-center justify-end gap-3 pe-4">
    <Tooltip size="sm" content={'Edit Employee'} placement="top" color="invert">
      <Link href={routes?.eCommerce?.editOrder(row.id)}>
      <ActionIcon as="span" size="sm" variant="outline" className="hover:text-gray-700">
        <PencilIcon className="h-4 w-4" />
      </ActionIcon>
      </Link>
    </Tooltip>
    <Tooltip size="sm" content={'View Employee'} placement="top" color="invert">
      <Link href={routes?.eCommerce?.orderDetails(row.id)}>
      <ActionIcon as="span" size="sm" variant="outline" className="hover:text-gray-700">
        <EyeIcon className="h-4 w-4" />
      </ActionIcon>
      </Link>
    </Tooltip>
    <DeletePopover title={`Delete Employee`} description={`Are you sure you want to delete this employee?`} onDelete={()=> onDeleteItem(row.id)} />
  </div> ), }, ];