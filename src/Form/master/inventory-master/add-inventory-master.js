import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import useValidation from '../../../Hooks/useValidation';
import CustomButton from '../../../Component/ui/buttons/custom-button';
import CustomInput from '../../../Component/ui/form/input/custom-input';
import { addBatch, addTag, addVehicle, searchProduct, updateVehicle } from '../../../Constant/Api/Api';
import { HitApi } from '../../../Store/Action/Api/ApiAction';
import { inventoryMasterVariable as variable } from '../../../Constant/variables/master/inventory-master/inventory-master.variable';
import { setVehicleMasterApiJson } from '../../../Store/Action/master/vehicle-master/vehicle-master-action'
import { vehicleMasterSchema } from '../../../Utils/validators/master/vehicle-master/vehicle-master-schema';
import { setInventoryMasterApiJson } from '../../../Store/Action/master/inventory-master/inventory-master-action';
import { inventoryMasterSchema } from '../../../Utils/validators/master/inventory-master/inventory-master-scheema';
import SearchableSelect from '../../../Component/ui/form/select/SearchableSelect';


export default function AddInventoryMaster({ row, closeModal }) {
    var dispatch = useDispatch()
    const reduxInventory = useSelector(state => state.InventoryMasterReducer)
    const { errors, validate } = useValidation(inventoryMasterSchema);

    useEffect(() => {
        if (row?.id) {
            loadDefault(row)
        }
    }, [])


    const loadDefault = (row) => {
        var json = reduxInventory?.apiJson


        Object.assign(json, ...Object.keys(variable).map(key => ({ [variable[key]]: row[key] })));
        dispatch(setVehicleMasterApiJson(json))
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        var json = reduxInventory?.apiJson
        const validationErrors = validate(json);
        if (Object.keys(validationErrors).length === 0) {
            if (row?.id) {
                Object.assign(json, { id: row?.id })
                // HitApi(json, updateVehicle).then((result) => {

                // })
            } else {
                Object.assign(json, { status: json?.status || 'active', movementStatus: json?.movementStatus ||'active' })
                HitApi(json, addBatch).then((result) => {
                    console.log("result", result);
                    console.log("json", json)

                })
            }
        } else {

        }
    };

    const handleOnChange = (e) => {
        const { id, label, value } = e
        console.log(e);
        let oldJson = reduxInventory?.apiJson
        let newJson = { ...oldJson, "product_id": e?.id }
        dispatch(setInventoryMasterApiJson(newJson))

    }

    console.log("reduxInventory", reduxInventory);

    return (
        <div className='p-10'>
            <form onSubmit={handleSubmit}>
                <div className="space-y-5 lg:space-y-6">
                    <SearchableSelect name="product_id" label="Product" api={searchProduct} getFieldName={'productName'} onChange={handleOnChange} />
                    <CustomInput important={true} name="batchNumber" label="Batch Number" value={reduxInventory?.apiJson?.vehicleMaker} error={errors} reduxState={reduxInventory?.apiJson} setAction={setInventoryMasterApiJson} />
                    <CustomInput important={true} name="totalInventory" label="Total Inventory" value={reduxInventory?.apiJson?.vehicleMaker} error={errors} reduxState={reduxInventory?.apiJson} setAction={setInventoryMasterApiJson} />
                    <div className='flex gap-3 justify-end'>
                        <CustomButton text={'Cancel'} variant='flat' className={''} onClick={closeModal} />
                        <CustomButton type={'submit'} className={''} text={row?.id ? 'Update' : 'Submit'} />
                    </div>
                </div>
            </form>
        </div>
    )
}
