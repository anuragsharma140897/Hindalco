import { useCallback } from 'react';

export function useCapitalize() {
    const capitalize = useCallback((string) => {
        return string[0].toUpperCase() + string.slice(1);
    }, []);

    return capitalize;
}
