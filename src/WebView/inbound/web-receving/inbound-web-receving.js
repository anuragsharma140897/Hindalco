import React, { useMemo } from 'react'
import PageHeader from '../../../shared/page-header'
import { routes } from '../../../config/routes'
import { inboundWebRecevingScheema } from '../../../Utils/validators/Inbound/inbound-web-receving-scheema'
import { Form } from '../../../Component/ui/form';
import { Button, Input } from 'rizzui';
import { useMedia } from 'react-use';
import CustomSelect from '../../../Component/ui/form/select/custom-select';
import ControlledTable from '../../../Component/ControlledTable/ControlledTable';
import { getWebRecevingColumn } from './web-receving-column';
import { inboundOrderData } from '../../../dummyData/inbound-order-data';
import { useModal } from '../../../shared/modal-views/use-modal';
import { useColumn } from '../../../Hooks/use-column';
import { TableClass } from '../../../Constant/Classes/Classes';




const initialValues = {
  username: 'admin@',
  password: 'admin'
};

function InboundWebReceiving() {
  const { openModal, closeModal } = useModal();

  const isMedium = useMedia('(max-width: 1200px)', false);
  const columns = useMemo(() => getWebRecevingColumn({ inboundOrderData, openModal }))
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
      <PageHeader metaTitle={'Inbound / Web Receving'} btnText={'Create'} href={routes?.panel?.inbond?.webReceiving} disbleExport />
      <div>
        {/* Your Web Receiving UI */}

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

export default InboundWebReceiving