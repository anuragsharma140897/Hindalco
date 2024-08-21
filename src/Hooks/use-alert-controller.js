import { toast } from 'react-hot-toast';
import cn from '../Utils/class-names';
import { IoAlertCircleOutline } from "react-icons/io5";
import { Text, Title } from 'rizzui';
import { PiAlarm, PiTrashFill } from 'react-icons/pi';


const useAlertController = () => {
  const showCustomAlert = ({ type, title, message, onClose }) => {
    const bgColor = type === 'success' ? 'bg-green-500' : 'text-red-main';

    toast.custom((t) => (
      <div className="w-auto px-4 py-2 text-left rtl:text-right bg-white rizzui-popover-content min-w-max dark:bg-muted/80 dark:backdrop-blur-3xl border border-muted p-4 rounded-md drop-shadow-lg z-0">
        <Title as="h6" className={cn('mb-0.5 flex items-start text-sm sm:items-center', type === 'success'? ' text-green-600' :' text-red-600 ')}>
          <IoAlertCircleOutline className="me-1 h-[17px] w-[17px]" /> {title}
        </Title>
        <Text className="mb-2 leading-relaxed text-gray-500 font-bold tracking-wide"> {message} </Text>
      </div>
    ));
  };

  return { showCustomAlert };
};

export default useAlertController;
