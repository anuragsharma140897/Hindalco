import { atom, useAtomValue, useSetAtom } from 'jotai';

const modalAtom = atom({ isOpen: false, view: null, customSize: '320px', titleClass : '', useConfirmBox : '' });

export function useModal() {
  const state = useAtomValue(modalAtom);
  const setState = useSetAtom(modalAtom);

  const openModal = ({ view, customSize, title, titleClass, useConfirmBox }) => {
    setState({ ...state, isOpen: true, view, customSize, title, titleClass, useConfirmBox });
  };

  const closeModal = () => {
    setState({ ...state, isOpen: false });
  };

  return { ...state, openModal, closeModal };
}
