export const FilterCondition = [
    {
        _id : 0, screen : 'inventory-management',
        condition : [
            { _id : 0, title : 'All', value : 'All', status : true},
            { _id : 0, title : 'Dispatch', value : 'Dispatch', status : true},
            { _id : 0, title : 'Dispatched', value : 'Dispatched', status : true},
        ]
    },{
        _id : 1, screen : 'inventory-management-bags',
        condition : [
            { _id : 0, title : 'All', value : 'All', status : true},
            { _id : 0, title : 'Empty', value : 'Empty', status : true},
            { _id : 0, title : 'Filled', value : 'Filled', status : true},
            { _id : 0, title : 'Replaced', value : 'Replaced', status : true},
        ]
    }
]