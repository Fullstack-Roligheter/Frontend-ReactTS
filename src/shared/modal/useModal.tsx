import { useState } from 'react';

export const useModal = () => {
  const [isShown, setIsShown] = useState<boolean>(false);
  const toggle = () => setIsShown(!isShown);
  return {
    isShown,
    toggle,
  };
};

export const useEditModal = () => {
  const [isShownEdit, setIsShown] = useState<boolean>(false);
  const toggleEdit = () => setIsShown(!isShownEdit);
  return {
    isShownEdit,
    toggleEdit,
  };
};

export const useDeleteModal = () => {
  const [isShownDelete, setIsShown] = useState<boolean>(false);
  const toggleDelete = () => setIsShown(!isShownDelete);
  return {
    isShownDelete,
    toggleDelete,
  };
};
