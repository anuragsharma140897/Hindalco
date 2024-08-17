export const FilterCondition = [
    {
        _id : 1, screen : 'user',
        condition : [
            { 
                key:'status', 
                FilterType : 'Filter by Status',
                placeholder : 'Filter by Status',
                Options : [
                    { id:'Active', label : 'Active', value : 'active' },
                    { id:'Inactive', label : 'Inactive', value : 'inactive' },
                    { id:'Blocked', label : 'Blocked', value : 'blocked' },
                ],
                useCustomDisplay : true,
                status : true
            },{ 
                key:'role', 
                FilterType : 'Filter by Role',
                placeholder : 'Filter by Role',
                Options : [],
                useCustomDisplay : false,
                status : true
            }
        ]
    }
]