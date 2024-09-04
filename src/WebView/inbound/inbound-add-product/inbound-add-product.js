import React, { useState } from 'react'
import SearchableSelect from '../../../Component/ui/form/select/SearchableSelect'
import { useDispatch, useSelector } from 'react-redux';
import { searchProduct } from '../../../Constant/Api/Api';
import { setAddedProduct, setInboundApiJson, setInboundData } from '../../../Store/Action/inbound/inbound-action';
import { HitApi } from '../../../Store/Action/Api/ApiAction';
import CustomInput from '../../../Component/ui/form/input/custom-input';
import CustomButton from '../../../Component/ui/buttons/custom-button';
import { useModal } from '../../../shared/modal-views/use-modal';

function InboundAddProduct({setShowProdcutTbale}) {
    const reduxInbound = useSelector(state => state.InboundReducer);
    const dispatch = useDispatch()

    const [selectedDetails, setSelectedDetails] = useState(null);
    const reduxProduct = useSelector(state => state.ProductMasterReducer);
    const reduxPagination = useSelector(state => state.PaginationReducer);
    const [loading, setLoading] = useState(false)
    const { openModal, closeModal } = useModal();

    const [error, setError] = useState(null)






    const handleChange = (e) => {
        var oldJson = reduxInbound?.apiJson

        var json = {
            "productId": e?._id
        }
        Object.assign(oldJson, json)
        dispatch(setInboundApiJson(oldJson))
        fetchDetails(e?._id, searchProduct, setSelectedDetails);
    }



    const fetchDetails = (_id, apiMethod, setDetails) => {
        const searchJson = reduxProduct?.searchJson
        const json = { ...searchJson, page: 1, limit: reduxPagination?.doc?.limit, search: { _id } };
        HitApi(json, apiMethod).then((result) => {
            setDetails(result?.content?.[0] || null);
            const oldArr = [...reduxInbound?.productAdded]; 
            oldArr?.push(result?.content?.[0]);

            dispatch(setAddedProduct(oldArr))
        });
    };

    
    const handleAddProduct = () => {
        setError('');
        
        if(reduxInbound?.apiJson?.quantity) {
            const json = {
                "productId": selectedDetails?._id,
                "quantity": reduxInbound?.apiJson?.quantity
            };
            let oldProdArr = []

            var accuatalIndex = reduxInbound?.productAdded?.length-1


            let oldProdJson =reduxInbound?.productAdded?.[accuatalIndex]



            let newProdJson ={
                "quantity": reduxInbound?.apiJson?.quantity
            }
            Object.assign(oldProdJson,newProdJson);
            oldProdArr.push(oldProdJson)
            dispatch(setInboundData(oldProdArr));
            const oldArr = [...reduxInbound?.doc]; 

            oldArr?.push(json);
            dispatch(setInboundData(oldArr));
    
          
            const updatedJson = { ...reduxInbound?.apiJson };
            delete updatedJson.quantity; 
            dispatch(setInboundApiJson(updatedJson))
            setShowProdcutTbale(true)
            closeModal()
           
        }
        else {
            setError('Please enter the quantity');
        }
    };



    return (
        <div className='p-10'>
            <div className='mb-5'>
                <SearchableSelect name="productIds" label="Product" api={searchProduct} getFieldName={'productName'} onChange={(e) => handleChange(e)} />
            </div>
            <div>
                {
                    selectedDetails &&
                    <div>
                        <div className='grid grid-cols-4 gap-4'>
                            <div className='w-full'><span className='font-bold'> Product Name</span>  : <span>{selectedDetails?.productName}</span> </div>
                            <div className='w-full'><span className='font-bold'> Product Group</span>  : <span>{selectedDetails?.productGroup}</span> </div>
                            <div className='w-full'><span className='font-bold'> Product Code</span>  : <span>{selectedDetails?.productCode}</span> </div>
                            <div className='w-full'><span className='font-bold'> Product Code</span>  : <span>{selectedDetails?.productCode}</span> </div>
                            <div className='w-full'><span className='font-bold'> Product Description</span>  : <span>{selectedDetails?.productDescription}</span> </div>
                            <div className='w-full'><span className='font-bold'>Height</span>  : <span>{selectedDetails?.height}</span> </div>
                            <div className='w-full'><span className='font-bold'>Width</span>  : <span>{selectedDetails?.width}</span> </div>
                            <div className='w-full'><span className='font-bold'>Length</span>  : <span>{selectedDetails?.length}</span> </div>
                            <div className='w-full'><span className='font-bold'>Grade</span>  : <span>{selectedDetails?.grade}</span> </div>
                            <div className='w-full'><span className='font-bold'>Packed Weight</span>  : <span>{selectedDetails?.packedWeight}</span> </div>
                            <div className='w-full'><span className='font-bold'>Selling Cost</span>  : <span>{selectedDetails?.sellingCost}</span> </div>
                        </div>
                        <div className='mt-5'>
                            <CustomInput important={true} type={"number"} name="quantity" label="Quantity"  value={reduxInbound?.apiJson?.value} reduxState={reduxInbound?.apiJson} setAction={setInboundApiJson} />
                            {error && <div className='text-red-600'>{error}</div>}
                            <div className='flex gap-3 justify-end'>
                                <CustomButton text={'Cancel'} variant='flat' className={''} onClick={closeModal} />
                                <CustomButton type={'submit'} className={''} text={'Submit'} loading={loading} onClick={handleAddProduct} />
                            </div>
                        </div>

                    </div>
                }
            </div>
        </div>
    )
}

export default InboundAddProduct