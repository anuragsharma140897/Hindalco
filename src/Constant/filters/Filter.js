export const FilterCondition = [
    {
        _id : 1, screen : 'user',
        condition : [
            { 
                FilterType : 'Filter by Status',
                placeholder : 'Filter by Status',
                Options : [
                    { id:'Active', label : 'Active', value : 'active' },
                    { id:'Inactive', label : 'Inactive', value : 'inactive' },
                    { id:'Blocked', label : 'Blocked', value : 'blocked' },
                ],
                useCustomDisplay : false,
                status : true
            }
        ]
    }
]