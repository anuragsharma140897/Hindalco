'use client';

import { atom, useAtomValue, useSetAtom } from 'jotai';

const modalAtom = atom({
  isOpen: false,
  view: null,
  customSize: '320px',
});

export function useModal() {
  const state = useAtomValue(modalAtom);
  const setState = useSetAtom(modalAtom);

  const openModal = ({
    view,
    customSize,
  }) => {
    setState({
      ...state,
      isOpen: true,
      view,
      customSize,
    });
  };

  const closeModal = () => {
    setState({
      ...state,
      isOpen: false,
    });
  };

  return {
    ...state,
    openModal,
    closeModal,
  };
}
