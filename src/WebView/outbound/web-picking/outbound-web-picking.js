import React, { useMemo } from 'react'
import PageHeader from '../../../shared/page-header'
import { routes } from '../../../config/routes'
import { inboundWebRecevingScheema } from '../../../Utils/validators/Inbound/inbound-web-receving-scheema'
import { Button, Input } from 'rizzui'
import CustomSelect from '../../../Component/ui/form/select/custom-select'
import { Form } from '../../../Component/ui/form'
import { useMedia } from 'react-use'
import ControlledTable from '../../../Component/ControlledTable/ControlledTable'
import { useModal } from '../../../shared/modal-views/use-modal'
import { useColumn } from '../../../Hooks/use-column'
import { getWebPickingColumn } from './web-picking-column'
import { inboundOrderData } from '../../../dummyData/inbound-order-data'
import { TableClass } from '../../../Constant/Classes/Classes'




const initialValues = {
  username: 'admin@',
  password: 'admin'
};

function OutboundWebPicking() {
  const { openModal, closeModal } = useModal();

  const isMedium = useMedia('(max-width: 1200px)', false);
  const columns = useMemo(() => getWebPickingColumn({ inboundOrderData, openModal }))
  const { visibleColumns } = useColumn(columns);



  const onSubmit = (data) => {

    // HitApi(initialValues, LoginApi).then((res) => {

    //     if (res) {
    //         dispatch(setAuth(res))
    //     }
    // })
  };
  return (
    <div>
      <PageHeader metaTitle={'Outbound / Web Picking'} btnText={'Create'} href={routes?.panel?.outbond.outboundCreate} disbleExport />
      <div>

    <div className='bg-white p-10 shadow'>
    <Form validationSchema={inboundWebRecevingScheema} onSubmit={onSubmit} useFormProps={{ mode: 'onChange', defaultValues: initialValues, }} >
          {({ register, formState: { errors } }) => (
            <div className="space-y-5 lg:space-y-6">
              <div className='grid grid-cols-5 gap-4 items-end'>
                <Input type="email" size={isMedium ? 'lg' : 'xl'} label="Order Code" placeholder="Enter order code" className="[&>label>span]:font-medium " {...register('orderCode')} error={errors.orderCode?.message} />
                <CustomSelect options={[]} title={'Line ID'} register={register} fieldName={'lineId'} errors={errors} />
                <Input type="email" size={isMedium ? 'lg' : 'xl'} label="Product Code" placeholder="Enter Product code" className="[&>label>span]:font-medium " {...register('orderCode')} error={errors.orderCode?.message} />
                <CustomSelect options={[]} title={'Condition'} register={register} fieldName={'lineId'} errors={errors} />
                <Button className='h-14' type="submit" size={isMedium ? 'lg' : 'md'} > Search </Button>
              </div>
            </div>
          )}
        </Form>
    </div>
        <section >
          <div className='text-base text-black font-bold my-5'>Web Reciveing</div>
          <ControlledTable
          variant="modern"
          isLoading={false}
          showLoadingText={true}
          data={inboundOrderData}
          columns={visibleColumns}
          className={TableClass}
        />
        </section>

      </div>
    </div>
  )
}

export default OutboundWebPicking