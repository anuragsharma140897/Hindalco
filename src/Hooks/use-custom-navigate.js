import { useNavigate } from 'react-router-dom';

const useCustomNavigate = () => {
    const navigate = useNavigate();

    const goTo = (path, params = {}) => {
        const pathWithParams = Object.keys(params).reduce(
            (acc, key) => acc.replace(`:${key}`, params[key]),
            path
        );
        navigate(pathWithParams);
    };

    return { goTo };
};

export default useCustomNavigate;