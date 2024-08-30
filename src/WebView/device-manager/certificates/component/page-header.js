import { PiPlusCircleBold } from "react-icons/pi";
import { Button } from "rizzui";
import Cn from "../utils/class-names";

export default function PageHeader({ isEditAllowed = true, href, children, className, icon, btnText }) {

  const handleFunctionCall = () => {
    if (href) {
      window.location.href = href
    }
  }

  return (
    <header className={Cn('mb-6 @container xs:-mt-2 lg:mb-7', className)}>
      <div className="flex flex-col @lg:flex-row @lg:items-center @lg:justify-between mt-2">
        <div className="mt-4 flex items-center gap-3 @lg:mt-0">
          {(children || href) && isEditAllowed && <Button as="span" type="button" className="w-full @lg:w-auto cursor-pointer " onClick={() => handleFunctionCall()}>
            {icon ? icon : <PiPlusCircleBold className="me-2 h-4 w-4" />}
            <span>{btnText}</span>
          </Button>}
        </div>
      </div>
    </header>
  );
}
