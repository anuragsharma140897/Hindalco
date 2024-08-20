import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import useValidation from '../../../Hooks/useValidation';
import CustomButton from '../../../Component/ui/buttons/custom-button';
import CustomInput from '../../../Component/ui/form/input/custom-input';
import { inventoryMasterVariable as variable } from '../../../Constant/variables/master/inventory-master/inventory-master.variable';
import { generalMasterSchema } from '../../../Utils/validators/master/general-master/general-master-schema';
import { setGeneralMasterApiJson } from '../../../Store/Action/master/general-master/general-master-action';
import { setInventoryMasterApiJson } from '../../../Store/Action/master/inventory-master/inventory-master-action';
import { HitApi } from '../../../Store/Action/Api/ApiAction';
import { addGeneral, searchProduct, updateGeneral } from '../../../Constant/Api/Api';
import SearchableSelect from '../../../Component/ui/form/select/SearchableSelect';



export default function AddInventoryMaster({ row, closeModal }) {
    var dispatch = useDispatch()
    const reduxInventory = useSelector(state => state.InventoryMasterReducer)

    const [loading, setLoading] = useState(false)
    const { errors, validate } = useValidation(generalMasterSchema);

    useEffect(() => {
        if (row?.id) {
            loadDefault(row)
        }
    }, [])


    const loadDefault = (row) => {
        var json = reduxInventory?.apiJson
        Object.assign(json, ...Object.keys(variable).map(key => ({ [variable[key]]: row[key] })));
        dispatch(setGeneralMasterApiJson(json))
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        var json = reduxInventory?.apiJson
        const validationErrors = validate(json);
        if (Object.keys(validationErrors).length === 0) {
            setLoading(true)
            if (row?.id) {
                Object.assign(json, { id: row?.id })
                HitApi(json, updateGeneral).then((result) => {
                    setLoading(false)

                    if (result && result.status === 200) {
                        alert(result.message);
                        window.location.pathname = '/master/general';
                    }
                    else {
                        alert(result.message);
                    }

                })
            } else {
                Object.assign(json, { status: json?.status || 'active' })
                HitApi(json, addGeneral).then((result) => {
                    setLoading(false)

                    if (result && result.status === 201) {
                        alert(result.message);
                        window.location.pathname = '/master/general';
                    }
                    else {
                        alert(result.message);
                    }

                })
            }
        } else {

        }
    }


    return (
        <div className='p-10'>
            <form onSubmit={handleSubmit}>
                <div className="space-y-5 lg:space-y-6">
                    <SearchableSelect name="product_id" label="Product" api={searchProduct} getFieldLabel={'id'}  />
                    <CustomInput important={true} name="batchNumber" label="Batch Number" value={reduxInventory?.apiJson?.value} error={errors} reduxState={reduxInventory?.apiJson} setAction={setInventoryMasterApiJson} />
                    <CustomInput important={true} name="lotNumber" label="Lot Number" value={reduxInventory?.apiJson?.value} error={errors} reduxState={reduxInventory?.apiJson} setAction={setInventoryMasterApiJson} />



                    <div className='flex gap-3 justify-end'>
                        <CustomButton text={'Cancel'} variant='flat' className={''} onClick={closeModal} />
                        <CustomButton type={'submit'} className={''} text={row?.id ? 'Update' : 'Submit'} loading={loading} />
                    </div>
                </div>
            </form>
        </div>
    )
}
