import { Button, Title } from 'rizzui';
import cn from '../Utils/class-names';
import Breadcrumb from '../Component/ui/breadcrumb';
import ExportButton from './export-button';
import { PiCaretRightBold, PiPlusCircleBold } from 'react-icons/pi';
import { useModal } from './modal-views/use-modal';
import { pageHeader } from '../config/pageHeader';
import { useConfirm } from './confirm/use-confirm';
import { Colors } from '../Constant/Colors/Color';
import usePermissionCheck from '../Hooks/use-permission-check';
import { ScreenName } from '../Constant/Screen/Screen';

export default function PageHeader({ screen, metaTitle, btnText, className, data = [], children, fileName, customSize, title, disbleExport, icon, titleClass, useConfirmBox, params, hideBreadCrumb, exportBtnText, href }) {
  const { openModal } = useModal();
  let metaObject = pageHeader?.find((Obj) => Obj.title === metaTitle)
  // const isEditAllowed = usePermissionCheck(screen, 'write');
  const isEditAllowed = true

  const handleFunctionCall = () => {
    if (href) {
      window.location.href = href
    } else {
      openModal({
        view: children,
        customSize: customSize + 'px' || '1020px',
        title: title,
        titleClass: titleClass,
        useConfirmBox: useConfirmBox
      })
    }
  }

  return (
    <header className={cn('mb-6 @container xs:-mt-2 lg:mb-7', className)}>
      <div className="flex flex-col @lg:flex-row @lg:items-center @lg:justify-between mt-2">
        <div>
          {
            hideBreadCrumb ? null : <Breadcrumb separator="" separatorVariant="circle" className="flex-wrap mt-0">
              {metaObject?.breadcrumb?.map((item) => <Breadcrumb.Item key={item.name} {...(item?.href && { href: item?.href })}> {item.name} </Breadcrumb.Item>)}
            </Breadcrumb>
          }
        </div>
        <div className="mt-4 flex items-center gap-3 @lg:mt-0">
          {!disbleExport ? <ExportButton exportBtnText={exportBtnText} data={data} fileName={fileName || "test"} header="ID,Name,Category,Product Thumbnail,SKU,Stock,Price,Status,Rating" /> : null}
          {(children || href) && isEditAllowed && <Button as="span" type="button" className="w-full @lg:w-auto cursor-pointer " onClick={() => handleFunctionCall()} style={{ background: Colors.LOGINRED }} >
            {icon ? icon : <PiPlusCircleBold className="me-2 h-4 w-4" />}
            <span>{btnText}</span>
          </Button>}
        </div>
      </div>
    </header>
  );
}
