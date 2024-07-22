import { useContext } from 'react';
import ConfirmContext from '../shared/confirm/ConfirmContext';

let resolveCallback;
function useConfirm() {
    const [confirmState, dispatch] = useContext(ConfirmContext);
    const onConfirm = () => {
        closeConfirm();
        resolveCallback(true);
    };

    const onCancel = () => {
        closeConfirm();
        resolveCallback(false);
    };
    const confirm = text => {
        
        return new Promise((res, rej) => {
            resolveCallback = res;
        });
    };

    const closeConfirm = () => {
        
    };

    return { confirm, onConfirm, onCancel, confirmState };
}

export default useConfirm;