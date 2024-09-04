import { useEffect } from 'react';
import { ActionIcon, Modal, Text } from 'rizzui';
import { usePathname } from '../../Hooks/use-pathname';
import { useModal } from './use-modal';

export default function GlobalModal() {
  const { isOpen, view, closeModal, customSize, title, titleClass } = useModal();
  const pathname = usePathname();
  useEffect(() => {
    closeModal();
  }, [pathname]);

  return (
    <Modal isOpen={isOpen} onClose={()=>closeModal()} customSize={customSize} overlayClassName="dark:bg-opacity-40 dark:backdrop-blur-lg" containerClassName="dark:bg-gray-100" className="z-[9999]">
      {title ? <div className="m-auto px-7 pt-6">
        <div className={` ${titleClass} text-center`}> <Text as="h3" className={`font-bold`}>{title}</Text></div>
      </div> : null}
      {view}
    </Modal>
  );
}
