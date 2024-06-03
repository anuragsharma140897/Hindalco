import { Button, Title } from 'rizzui';
import cn from '../Utils/class-names';
import Breadcrumb from '../Component/ui/breadcrumb';
import ExportButton from './export-button';
import { PiPlusCircleBold } from 'react-icons/pi';
import { useModal } from './modal-views/use-modal';
import { pageHeader } from '../config/pageHeader';

export default function PageHeader({ metaTitle, btnText, className, data = [], children, fileName }) {
  const { openModal } = useModal();
  let metaObject = pageHeader?.find((Obj) => Obj.title === metaTitle)

  return (
    <header className={cn('mb-6 @container xs:-mt-2 lg:mb-7', className)}>
      <div className="flex flex-col @lg:flex-row @lg:items-center @lg:justify-between">
        <div>
          <Title as="h2" className="mb-2 text-[22px] lg:text-2xl 4xl:text-[26px]"> {metaObject?.title} </Title>
          <Breadcrumb separator="" separatorVariant="circle" className="flex-wrap">
            {metaObject?.breadcrumb?.map((item) => <Breadcrumb.Item key={item.name} {...(item?.href && { href: item?.href })}> {item.name} </Breadcrumb.Item>)}
          </Breadcrumb>
        </div>
        <div className="mt-4 flex items-center gap-3 @lg:mt-0">
          <ExportButton data={data} fileName={fileName || "test"} header="ID,Name,Category,Product Thumbnail,SKU,Stock,Price,Status,Rating" />
          {children ? <Button as="span" type="button" className="w-full @lg:w-auto" onClick={() => openModal({ view: children, customSize: '1020px' })} >
            <PiPlusCircleBold className="me-2 h-4 w-4" />
            <span>{btnText}</span>
          </Button> : null}
        </div>
      </div>
    </header>
  );
}
