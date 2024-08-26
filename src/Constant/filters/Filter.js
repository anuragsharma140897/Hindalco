import SearchableSelect from "../../Component/ui/form/select/SearchableSelect";
import { searchGeneral, searchRole } from "../Api/Api";
import { ScreenName } from "../Screen/Screen";

export const FilterCondition = [
    {
        _id : 1, screen : ScreenName?.user,
        condition : [
            {
                id : 0,
                serverKey:'status',
                render : (onChange)=><SearchableSelect type={'filter'} api={searchGeneral} dynamicSearch={{'fieldName':'status'}} getFieldName={'value'} onChange={onChange}/>,
                useCustomDisplay : true,
            },
            {
                id : 1,
                serverKey:'roleName',
                render : (onChange)=><SearchableSelect type={'filter'} api={searchRole} getFieldName={'roleName'} onChange={onChange}/>,
                useCustomDisplay : true,
            }
        ]
    }
]