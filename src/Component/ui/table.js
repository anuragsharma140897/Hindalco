import RcTable from 'rc-table';
import cn from '../../Utils/class-names';
import { Empty, Text } from 'rizzui';

const classes = {
  table : `[&_table]:w-full  [&_table]:rounded-[14px] [&_table]:overflow-hidden	[&_table]:bg-white`,
  thead : `[&_thead]:text-left [&_thead]:bg-red-main [&_thead]:text-white`,
  tcell : `[&_.rc-table-cell]:px-3 [&_th.rc-table-cell]:py-2 [&_td.rc-table-cell]:py-2`,
  striped:
    '[&_.rc-table-row:hover]:bg-red-lighter [&_.rc-table-row:hover]:duration-100',

  
};

export default function Table({ striped, variant = 'retro', emptyText, className, ...props }) {
  return (
    // <RcTable className={cn(classes.table, classes.thead, classes.tCell, classes.variants[variant], striped && classes.striped, className,' rounded-2xl')}
    <RcTable  className={cn(classes?.table, classes?.thead, classes?.tcell, classes?.striped)}
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

export function HeaderCell({ title, align = 'left', width, ellipsis, sortable, className }) {
  if (ellipsis && width === undefined) {
    console.warn('When ellipsis is true make sure you are using the same column width in HeaderCell component too.');
  }
  if (width !== undefined && ellipsis !== true) {
    console.warn("width prop without ellipsis won't work, please set ellipsis prop true.");
  }
  return (
    <div className={cn('flex items-center gap-1 ', sortable && 'cursor-pointer', handleTextAlignment(align), className)} >
      <div {...(ellipsis && { className: 'truncate' })} {...(ellipsis && width && { style: { width } })} >
        {title}
      </div>
    </div>
  );
}
