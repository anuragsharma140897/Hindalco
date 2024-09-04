import React, { useCallback, useMemo, useState } from 'react';
import PageHeader from '../../../shared/page-header';
import DateAndTime from '../../../Component/ui/date-and-time/date-and-time';
import SearchableSelect from '../../../Component/ui/form/select/SearchableSelect';
import { addInbound, searchCustomer, searchGeneral, searchSupplier } from '../../../Constant/Api/Api';
import { useDispatch, useSelector } from 'react-redux';
import { setInboundApiJson } from '../../../Store/Action/inbound/inbound-action';
import { Radio, RadioGroup } from 'rizzui';
import { HitApi } from '../../../Store/Action/Api/ApiAction';
import { IoIosAddCircle } from "react-icons/io";
import { Colors } from '../../../Constant/Colors/Color';
import { useModal } from '../../../shared/modal-views/use-modal';
import InboundAddProduct from '../inbound-add-product/inbound-add-product';
import CustomButton from '../../../Component/ui/buttons/custom-button';
import { TableClass } from '../../../Constant/Classes/Classes';
import { useColumn } from '../../../Hooks/use-column';
import ControlledTable from '../../../Component/ControlledTable/ControlledTable';
import { inboundProductColumns } from '../inbound-add-product/inbound-product-column';


function CreateInbound() {
  const [defaultDates, setDefaultDates] = useState({
    orderDateTime: new Date(),
    expectedArrival: new Date()
  });
  const [value, setValue] = useState("");
  const [selectedDetails, setSelectedDetails] = useState(null);
  const { openModal, closeModal } = useModal();

  const dispatch = useDispatch();
  const reduxInbound = useSelector(state => state.InboundReducer);
  const reduxPagination = useSelector(state => state.PaginationReducer);
  const reduxCustomer = useSelector(state => state.CustomerMasterReducer);
  const reduxSupplier = useSelector(state => state.SupplierMasterReducer);
  const [showProdcutTbale, setShowProdcutTbale] = useState(false)
  const [loading, setLoading] = useState(false)
  const columns = useMemo(() => inboundProductColumns({ openModal, closeModal ,loading,setLoading }))

  const { visibleColumns } = useColumn(columns);





  const handleOnChange = useCallback((e, name) => {
    const { id } = e;
    let newJson = { [name]: id };

    setSelectedDetails(null);

    if (name === 'customerId') {
      newJson = { ...newJson, supplierId: null };
      fetchDetails(id, searchCustomer, setSelectedDetails);
    } else if (name === 'supplierId') {
      newJson = { ...newJson, customerId: null };
      fetchDetails(id, searchSupplier, setSelectedDetails);
    }
    else {
      newJson = { [name]: e.value };
    }


    const updatedJson = { ...reduxInbound?.apiJson, ...newJson };
    dispatch(setInboundApiJson(updatedJson));
  }, [dispatch, reduxInbound?.apiJson]);

  const handleDateChange = (e, name) => {
    setDefaultDates(prevState => ({
      ...prevState,
      [name]: e
    }));
    const formattedDate = e?.toISOString()?.slice(0, 19);
    const updatedJson = { ...reduxInbound?.apiJson, [name]: formattedDate };
    dispatch(setInboundApiJson(updatedJson));
  };

  const fetchDetails = (id, apiMethod, setDetails) => {
    const searchJson = value === 'Customer' ? reduxCustomer?.searchJson : reduxSupplier?.searchJson;
    const json = { ...searchJson, page: 1, limit: reduxPagination?.doc?.limit, search: { id } };
    HitApi(json, apiMethod).then((result) => {

      setDetails(result?.content?.[0] || null);
    });
  };

  const handleFunctionCall = () => {

    openModal({
      view: <InboundAddProduct closeModal={closeModal} setShowProdcutTbale={setShowProdcutTbale} />,
      customSize: '800px',
      title: "Add Product",
    })

  }

  const handelAddInbound = ()=>{

    var ddf ={
      "orderDateTime": "2024-08-07T16:51:44",
      "expectedArrival": "2024-08-07T16:51:44",
      "orderType": "Order type B",
      "orderStatus": "Order status Inactive",
      "supplierId": "66c79c142d24a82889205f53",
      "customerId": null,
      "productIds": [
          {
              "productId": "66bf99a2fdab1e0462c8589a",
              "quantity": "12"
          },
          {
              "productId": "66bf9978fdab1e0462c85899",
              "quantity": "18"
          }
      ]
  }
    let oldJson = reduxInbound?.apiJson
    
    let json = {
      "productIds" : reduxInbound?.doc

    }
    Object.assign(oldJson, json);
    HitApi(ddf, addInbound).then((result) => {

    })




  }





  return (
    <div>
      <PageHeader metaTitle={'Inbound / Create'} disbleExport />
      {/* General */}
      <div>
        <div className='text-base text-black font-semibold'>General</div>
        <div className='bg-white p-10 rounded-xl grid grid-cols-4 mt-5 gap-x-8'>
          <DateAndTime label={"Order Date Time"} onChange={(e) => handleDateChange(e, "orderDateTime")} value={defaultDates.orderDateTime} />
          <DateAndTime label={"Expected Arrival"} onChange={(e) => handleDateChange(e, "expectedArrival")} value={defaultDates.expectedArrival} />
          <SearchableSelect name="orderType" label="Order Type" api={searchGeneral} checkServerKey={'fieldName'} checkServerValue={'ordertype'} getFieldName={'value'} dynamicSearch={{ 'fieldName': 'ordertype' }} value={reduxInbound?.apiJson?.orderType} reduxState={reduxInbound?.apiJson} onChange={(e) => handleOnChange(e, 'orderType')} />
          <SearchableSelect name="orderStatus" label="Order Status" api={searchGeneral} checkServerKey={'fieldName'} checkServerValue={'orderstatus'} getFieldName={'value'} dynamicSearch={{ 'fieldName': 'orderstatus' }} value={reduxInbound?.apiJson?.orderStatus} reduxState={reduxInbound?.apiJson} onChange={(e) => handleOnChange(e, 'orderStatus')} />
        </div>
      </div>

      <div className='mt-10'>
        <div className='text-base text-black font-semibold mb-5'>Customer / Supplier</div>
        <RadioGroup
          value={value}
          setValue={(newValue) => {
            setValue(newValue);
            setSelectedDetails(null);
          }}
          className="flex gap-4"
        >
          <Radio label="Customer" value="Customer" />
          <Radio label="Supplier" value="Supplier" />
        </RadioGroup>

        <div className='grid grid-cols-4'>
          <div className='mt-5 '>
            {value === "Customer" && <SearchableSelect name="customerId" label="Customer" api={searchCustomer} getFieldName={'customerName'} onChange={(e) => handleOnChange(e, 'customerId')} />}
            {value === "Supplier" && <SearchableSelect name="supplierId" label="Supplier" api={searchSupplier} getFieldName={'supplierName'} onChange={(e) => handleOnChange(e, 'supplierId')} />}
          </div>
        </div>

        {/* Details */}
        {selectedDetails &&
          <div>
            <div>
              <div className='text-base text-black font-semibold mb-5'>{`${value} Details`}</div>
              <div className='grid grid-cols-3 gap-y-5 bg-white p-10 rounded-xl'>
                <div className='w-full'><span className='font-bold'>{`${value} Name`}</span>  : <span>{value === "Customer" ? selectedDetails?.customerName : selectedDetails?.supplierName}</span> </div>
                <div className='w-full'><span className='font-bold'>{`${value} Code`} </span>: <span>{value === "Customer" ? selectedDetails?.customerCode : selectedDetails?.supplierCode}</span> </div>
                <div className='w-full'><span className='font-bold'>{`${value} Email`} </span>: <span>{value === "Customer" ? selectedDetails?.customerEmail : selectedDetails?.supplierContactEmail}</span> </div>
                <div className='w-full'><span className='font-bold'>{`${value} Type`} </span>: <span>{value === "Customer" ? selectedDetails?.customerType : selectedDetails?.supplierType}</span> </div>
                <div className='w-full'><span className='font-bold'>{`${value} Address1`} </span>: <span>{value === "Customer" ? selectedDetails?.customerAddress1 : selectedDetails?.supplierAddress1}</span> </div>
                <div className='w-full'><span className='font-bold'>{`${value} Address2`} </span>: <span>{value === "Customer" ? selectedDetails?.customerAddress2 : selectedDetails?.supplierAddress2}</span> </div>
                <div className='w-full'><span className='font-bold'>{`${value} Landmark`} </span>: <span>{value === "Customer" ? selectedDetails?.customerLandmark : selectedDetails?.supplierLandmark}</span> </div>
                <div className='w-full'><span className='font-bold'>{`${value} Country`} </span>: <span>{value === "Customer" ? selectedDetails?.customerCountry : selectedDetails?.supplierCountry}</span> </div>
                <div className='w-full'><span className='font-bold'>{`${value} State`} </span>: <span>{value === "Customer" ? selectedDetails?.customerState : selectedDetails?.supplierState}</span> </div>
                <div className='w-full'><span className='font-bold'>{`${value} City`} </span>: <span>{value === "Customer" ? selectedDetails?.customerCity : selectedDetails?.supplierCity}</span> </div>
                <div className='w-full'><span className='font-bold'>{`${value} PostCode`} </span>: <span>{value === "Customer" ? selectedDetails?.customerType : selectedDetails?.supplierPostCode}</span> </div>
                <div className='w-full'><span className='font-bold'>{`${value} GST`} </span>: <span>{value === "Customer" ? selectedDetails?.customerGst : selectedDetails?.supplierGst}</span> </div>
                <div className='w-full'><span className='font-bold'>{`${value} PAN`} </span>: <span>{value === "Customer" ? selectedDetails?.customerType : selectedDetails?.supplierPan}</span> </div>
                <div className='w-full'><span className='font-bold'>{`${value} TAN`} </span>: <span>{value === "Customer" ? selectedDetails?.customerTan : selectedDetails?.supplierTan}</span> </div>
                <div className='w-full'><span className='font-bold'>{`${value} VAT`} </span>: <span>{value === "Customer" ? selectedDetails?.customerVat : selectedDetails?.supplierVat}</span> </div>
                <div className='w-full'><span className='font-bold'>{`${value} Status`} </span>: <span>{value === "Customer" ? selectedDetails?.customerStatus : selectedDetails?.supplierStatus}</span> </div>
              </div>
            </div>

            {/* productAdd */}
            <div className='flex items-center  mt-5 gap-x-2'>
              <div className='text-base text-black font-semibold'>Add Product</div>
              <div className='cursor-pointer'>
                <IoIosAddCircle size={30} color={Colors.LOGINRED} onClick={handleFunctionCall} />
              </div>
            </div>
            {showProdcutTbale &&
              <div>
                <div className='flex gap-3 justify-end mb-5'>
                  <CustomButton text={'Back'} variant='flat' className={''} onClick={() => window.location.pathname = 'inbond/inbound-order'} />
                  <CustomButton type={'submit'} className={''} text={'Submit'} loading={loading} onClick={handelAddInbound} />
                </div>
                <ControlledTable
                  variant="modern"
                  isLoading={false}
                  showLoadingText={true}
                  data={reduxInbound?.productAdded}
                  columns={visibleColumns}
                  className={TableClass}

                />
              </div>
            }


          </div>

        }


      </div>
    </div>
  );
}

export default CreateInbound;
