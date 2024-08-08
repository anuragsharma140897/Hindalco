import React from 'react'
import PageHeader from '../../../shared/page-header'
import { Form } from '../../../Component/ui/form'
import { inboundWebRecevingScheema } from '../../../Utils/validators/Inbound/inbound-web-receving-scheema'
import { Button, Input } from 'rizzui'
import CustomSelect from '../../../Component/ui/form/select/custom-select'
import { useMedia } from 'react-use'
import { useModal } from '../../../shared/modal-views/use-modal'
import AddProductMaster from '../../../Form/master/product-master/add-product-master'



const initialValues = {
    username: 'admin@',
    password: 'admin'
};
function CreateOutbound() {

    const { openModal, closeModal } = useModal();

    const isMedium = useMedia('(max-width: 1200px)', false);


    const onSubmit = (data) => {

        // HitApi(initialValues, LoginApi).then((res) => {

        //     if (res) {
        //         dispatch(setAuth(res))
        //     }
        // })
    };


    const handleFunctionCall = () => {
        
          openModal({
            view: <AddProductMaster closeModal={closeModal}/>,
            customSize: 600 + 'px' || '1020px',
            title: <div className='text-center'>Add Product</div>,
            titleClass: false,
            useConfirmBox: false
          })
        
      }
    return (
        <div>
            <PageHeader metaTitle={'Outbound / Create'} disbleExport />
            <div>
                {/*  Create General Form */}
                <div className='text-base text-black font-semibold'>General</div>
                <div className='bg-white p-10 shadow mt-5'>
                    <Form validationSchema={inboundWebRecevingScheema} onSubmit={onSubmit} useFormProps={{ mode: 'onChange', defaultValues: initialValues, }} >
                        {({ register, formState: { errors } }) => (
                            <div className="space-y-5 lg:space-y-6">
                                <div className='grid grid-cols-4 gap-4 items-end'>
                                    <Input type="email" size={isMedium ? 'lg' : 'xl'} label="Order Code" placeholder="Enter order code" className="[&>label>span]:font-medium " {...register('orderCode')} error={errors.orderCode?.message} />
                                    <CustomSelect options={[]} title={'Line ID'} register={register} fieldName={'lineId'} errors={errors} />
                                    <Input type="email" size={isMedium ? 'lg' : 'xl'} label="Product Code" placeholder="Enter Product code" className="[&>label>span]:font-medium " {...register('orderCode')} error={errors.orderCode?.message} />
                                    <CustomSelect options={[]} title={'Condition'} register={register} fieldName={'lineId'} errors={errors} />
                                    <Input type="email" size={isMedium ? 'lg' : 'xl'} label="Order Code" placeholder="Enter order code" className="[&>label>span]:font-medium " {...register('orderCode')} error={errors.orderCode?.message} />
                                    <Input type="email" size={isMedium ? 'lg' : 'xl'} label="Order Code" placeholder="Enter order code" className="[&>label>span]:font-medium " {...register('orderCode')} error={errors.orderCode?.message} />


                                </div>
                            </div>
                        )}
                    </Form>
                </div>
            </div>
            <div>
                {/*  Create Coustomer & Supplier Form */}
                <div className='text-base text-black font-semibold mt-5'>Coustomer & Supplier</div>
                <div className='bg-white p-10 shadow mt-5'>
                    <Form validationSchema={inboundWebRecevingScheema} onSubmit={onSubmit} useFormProps={{ mode: 'onChange', defaultValues: initialValues, }} >
                        {({ register, formState: { errors } }) => (
                            <div className="space-y-5 lg:space-y-6">
                                <div className='grid grid-cols-4 gap-4 items-end'>
                                    <Input type="email" size={isMedium ? 'lg' : 'xl'} label="Order Code" placeholder="Enter order code" className="[&>label>span]:font-medium " {...register('orderCode')} error={errors.orderCode?.message} />
                                    <CustomSelect options={[]} title={'Line ID'} register={register} fieldName={'lineId'} errors={errors} />
                                    <Input type="email" size={isMedium ? 'lg' : 'xl'} label="Product Code" placeholder="Enter Product code" className="[&>label>span]:font-medium " {...register('orderCode')} error={errors.orderCode?.message} />
                                    <CustomSelect options={[]} title={'Condition'} register={register} fieldName={'lineId'} errors={errors} />
                                    <Input type="email" size={isMedium ? 'lg' : 'xl'} label="Order Code" placeholder="Enter order code" className="[&>label>span]:font-medium " {...register('orderCode')} error={errors.orderCode?.message} />
                                    <Input type="email" size={isMedium ? 'lg' : 'xl'} label="Order Code" placeholder="Enter order code" className="[&>label>span]:font-medium " {...register('orderCode')} error={errors.orderCode?.message} />
                                </div>
                            </div>
                        )}
                    </Form>
                </div>
            </div>
            {/* Create Product */}
            <div>
                {/*  Create Coustomer & Supplier Form */}
                <div className='text-base text-black font-semibold mt-5'>Product</div>
                <div className='mt-5'>
                <Button onClick={()=>handleFunctionCall()} type="submit" size={isMedium ? 'lg' : 'xl'} >Add</Button>
                </div>
              
            </div>

        </div>
    )
}

export default CreateOutbound