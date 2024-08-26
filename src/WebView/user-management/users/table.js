import React from 'react';
import RcTable from 'rc-table';
import { Empty, Text } from 'rizzui';
import cn from '../../../Utils/class-names';

const classes = {
  table: `[&_table]:w-full [&_table]:rounded-[14px] [&_table]:bg-white`,
  thead: `[&_thead]:text-left [&_thead]:bg-red-main [&_thead]:text-white`,
  tcell: `[&_.rc-table-cell]:px-3 [&_th.rc-table-cell]:py-2 [&_td.rc-table-cell]:py-2 [&_th.rc-table-cell]:border-x`,
  striped:
    '[&_.rc-table-row:hover]:bg-red-lighter [&_.rc-table-row:hover]:duration-100',
  variants: {
    classic:
      '[&_.rc-table-container]:overflow-x-scroll [&_thead]:bg-gray-100 [&_.rc-table-container]:border-x [&_.rc-table-container]:border-muted/70 [&_td.rc-table-cell]:border-b [&_td.rc-table-cell]:border-muted/70 [&_thead]:border-y [&_thead]:border-muted/70',
    modern:
      '[&_thead_th]:bg-gray-100 [&_td.rc-table-cell]:border-b [&_td.rc-table-cell]:border-muted/70 [&_thead_.rc-table-row-expand-icon-cell]:bg-gray-100',
    minimal:
      '[&_thead_th]:bg-gray-100 [&_thead_th:first-child]:rounded-ss-lg [&_thead_th:first-child]:rounded-es-lg [&_thead_th:last-child]:rounded-se-lg [&_thead_th:last-child]:rounded-ee-lg [&_thead_.rc-table-row-expand-icon-cell]:bg-gray-100',
    elegant:
      '[&_.rc-table-container]:overflow-x-scroll [&_thead]:border-y [&_thead]:border-muted/70 [&_td.rc-table-cell]:border [&_td.rc-table-cell]:border-muted/70',
    retro:
      '[&_thead]:border-y [&_thead]:border-muted/70 [&_tbody_tr:last-child_td.rc-table-cell]:border-b [&_tbody_tr:last-child_td.rc-table-cell]:border-muted/70',
  },
};

export default function Table({ striped, variant = 'elegant', emptyText, className, ...props }) {
  // Combine the necessary classes based on props
  const combinedClasses = cn(
    classes?.table,
    classes?.thead,
    classes?.tcell,
    classes.variants[variant],
    striped && classes?.striped,
    className
  );

  return (
    <RcTable
      className={combinedClasses}
      emptyText={
        emptyText || (
          <div className="py-5 text-center lg:py-8">
            <Empty /> 
            <Text className="mt-3">No Data</Text>
          </div>
        )
      }
      {...props}
    />
  );
}

// Helper function to determine text alignment classes
function handleTextAlignment(align) {
  if (align === 'center') return 'justify-center';
  if (align === 'right') return 'justify-end';
  return '';
}

// HeaderCell component for table header cells with custom styles and options
export function HeaderCell({ title, align = 'left', width, ellipsis, sortable, className }) {
  if (ellipsis && width === undefined) {
    console.warn('When ellipsis is true, ensure you provide a column width in HeaderCell.');
  }
  if (width !== undefined && ellipsis !== true) {
    console.warn("Width prop without ellipsis won't work. Please set ellipsis prop to true.");
  }

  return (
    <div className={cn('flex items-center gap-1', sortable && 'cursor-pointer', handleTextAlignment(align), className)}>
      <div {...(ellipsis && { className: 'truncate' })} {...(ellipsis && width && { style: { width } })}>
        {title}
      </div>
    </div>
  );
}
