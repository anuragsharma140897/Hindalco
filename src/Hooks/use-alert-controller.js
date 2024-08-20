import { toast } from 'react-hot-toast';

const useAlertController = () => {
  const showCustomAlert = ({ type, name, message, onClose }) => {
    toast?.[type || 'success'](message)
  };

  return { showCustomAlert };
};

export default useAlertController;
