import { PiCaretDownBold } from 'react-icons/pi';
import { Select } from 'rizzui';
import Pagination from '../pagination';
import { useDispatch, useSelector } from 'react-redux';
import cn from '../../../Utils/class-names';
import { setPagination } from '../../../Store/Action/Pagination/PaginationAction';

const paginationLimitOptions = [1,2, 3, 5, 10, 15, 20, 25].map((v, idx) => ({
  id: idx,
  label: String(v),
  value: v,
}));
export default function TablePagination({ total, paginatorClassName = 'mt-5 xs:mt-6 sm:mt-7', ApiHit, ...props }) {
  const dispatch = useDispatch()
  const reduxPagination = useSelector(state => state.PaginationReducer)
  const handlePaginate = (value) => {
    var json = reduxPagination?.doc
    json.limit = value
    json.number = 1
    dispatch(setPagination(json))
    if(ApiHit) ApiHit()
  }

  return (
    <div className={cn('table-pagination flex items-center justify-center sm:justify-between px-5', paginatorClassName)}>
      <div className="hidden items-center sm:flex">
        Rows per page:{' '}
        <Select options={paginationLimitOptions} onChange={handlePaginate} size="sm" variant="flat" value={reduxPagination?.doc?.limit} getOptionValue={({ value }) => value}
          suffix={<PiCaretDownBold />} dropdownClassName="!p-1.5 border w-12 border-gray-100 !z-10 shadow-lg dropdownClassName"
          className="ms-1 w-auto [&_button]:font-medium" optionClassName="px-1" />
      </div>
      <Pagination total={total} pageSize={reduxPagination?.doc?.limit} defaultCurrent={1} showLessItems={true}
        prevIconClassName="py-0 text-gray-500 !leading-[26px]"
        nextIconClassName="py-0 text-gray-500 !leading-[26px]"
        {...props}
      />
    </div>
  );
}
