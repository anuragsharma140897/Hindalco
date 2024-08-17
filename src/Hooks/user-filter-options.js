import { useState, useCallback } from 'react';
import { FilterCondition } from '../Constant/filters/Filter';

export function useFilterOptions() {
    const [filters, setFilters] = useState(FilterCondition);

    const updateFilterOptions = useCallback((screen, filterType, newOptions) => {
        setFilters(prevFilters => {
            return prevFilters.map(filter => {
                if (filter.screen === screen) {
                    return {
                        ...filter,
                        condition: filter.condition.map(cond => {
                            if (cond.FilterType === filterType) {
                                return {
                                    ...cond,
                                    Options: newOptions
                                };
                            }
                            return cond;
                        })
                    };
                }
                return filter;
            });
        });
    }, []);

    return {
        filters,
        updateFilterOptions
    };
}
