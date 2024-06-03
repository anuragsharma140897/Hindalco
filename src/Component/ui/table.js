import RcTable from 'rc-table';
import cn from '../../Utils/class-names';
import { Empty, Text } from 'rizzui';

const classes = {
  table:
    '[&_.rc-table-content]:overflow-x-auto [&_table]:w-full [&_.rc-table-row:hover]:bg-gray-50 [&_.rc-table-row-expand-icon-cell]:w-14',
  thead:
    '[&_thead]:text-left [&_thead]:rtl:text-right [&_th.rc-table-cell]:uppercase [&_th.rc-table-cell]:text-xs [&_th.rc-table-cell]:font-semibold [&_th.rc-table-cell]:tracking-wider [&_th.rc-table-cell]:text-gray-500',
  tCell:
    '[&_.rc-table-cell]:px-3 [&_th.rc-table-cell]:py-3 [&_td.rc-table-cell]:py-4',
  variants: {
    classic:
      '[&_thead]:bg-gray-100 [&_.rc-table-container]:border-x [&_.rc-table-container]:border-muted/70 [&_td.rc-table-cell]:border-b [&_td.rc-table-cell]:border-muted/70 [&_thead]:border-y [&_thead]:border-muted/70',
    modern:
      '[&_thead_th]:bg-gray-100 [&_td.rc-table-cell]:border-b [&_td.rc-table-cell]:border-muted/70 [&_thead_.rc-table-row-expand-icon-cell]:bg-gray-100',
    minimal:
      '[&_thead_th]:bg-gray-100 [&_thead_th:first-child]:rounded-ss-lg [&_thead_th:first-child]:rounded-es-lg [&_thead_th:last-child]:rounded-se-lg [&_thead_th:last-child]:rounded-ee-lg [&_thead_.rc-table-row-expand-icon-cell]:bg-gray-100',
    elegant:
      '[&_thead]:border-y [&_thead]:border-muted/70 [&_td.rc-table-cell]:border-b [&_td.rc-table-cell]:border-muted/70',
    retro:
      '[&_thead]:border-y [&_thead]:border-muted/70 [&_tbody_tr:last-child_td.rc-table-cell]:border-b [&_tbody_tr:last-child_td.rc-table-cell]:border-muted/70',
  },
  striped:
    '[&_.rc-table-row:nth-child(2n)_.rc-table-cell]:bg-gray-100/50 [&_.rc-table-row:hover]:bg-transparent',
};

export default function Table({
  striped,
  variant = 'classic',
  emptyText,
  className,
  ...props
}) {
  return (
    <RcTable className={cn( classes.table, classes.thead, classes.tCell, classes.variants[variant], striped && classes.striped, className )}
      emptyText={
        emptyText || (
          <div className="py-5 text-center lg:py-8">
            <Empty /> <Text className="mt-3">No Data</Text>
          </div>
        )
      }
      {...props}
    />
  );
}


function handleTextAlignment(align) {
  if (align === 'center') return 'justify-center';
  if (align === 'right') return 'justify-end';
  return '';
}

export function HeaderCell({
  title,
  align = 'left',
  width,
  ellipsis,
  sortable,
  className,
}) {
  if (ellipsis && width === undefined) {
    console.warn(
      'When ellipsis is true make sure you are using the same column width in HeaderCell component too.'
    );
  }
  if (width !== undefined && ellipsis !== true) {
    console.warn(
      "width prop without ellipsis won't work, please set ellipsis prop true."
    );
  }
  return (
    <div
      className={cn( 'flex items-center gap-1', sortable && 'cursor-pointer', handleTextAlignment(align), className )} >
      <div {...(ellipsis && { className: 'truncate' })} {...(ellipsis && width && { style: { width } })}>
        {title}
      </div>
    </div>
  );
}
