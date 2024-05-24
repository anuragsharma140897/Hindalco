'use client';

import { formParts } from './form-nav';
import { CreateProductInput, productFormSchema } from '@/utils/validators/create-product.schema';
import { useState } from 'react';
import { useLayout } from '@/hooks/use-layout';
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { defaultValues } from '@/shared/employee/create-edit/form-utils';
import ProductSummary from './product-summary';
import { useDispatch } from 'react-redux';


const MAP_STEP_TO_COMPONENT = {
  [formParts.summary]: ProductSummary,
  // [formParts.media]: ProductMedia,
  // [formParts.pricingInventory]: PricingInventory,
  // [formParts.productIdentifiers]: ProductIdentifiers,
  // [formParts.shipping]: ShippingInfo,
  // [formParts.seo]: ProductSeo,
  // [formParts.deliveryEvent]: DeliveryEvent,
  // [formParts.variantOptions]: ProductVariants,
  // [formParts.tagsAndCategory]: ProductTaxonomies,
};

interface IndexProps {
  slug?: string;
  className?: string;
  product?: CreateProductInput;
}

export default function CreateEditEmployee({
  slug,
  product,
  className,
}: IndexProps) {
  const { layout } = useLayout();
  const [isLoading, setLoading] = useState(false);
  const dispatch = useDispatch()
  const methods = useForm<CreateProductInput>({
    resolver: zodResolver(productFormSchema),
    defaultValues: defaultValues(product),
  });

  const onSubmit: SubmitHandler<CreateProductInput> = (data) => {
    // setLoading(true);
    // setTimeout(() => {
    //   setLoading(false);
    //   console.log('product_data', data);
    //   toast.success(
    //     <Text as="b">Product successfully {slug ? 'updated' : 'created'}</Text>
    //   );
    //   methods.reset();
    // }, 600);

    console.log('submit form', );
    
  };

  const handleSub = () =>{
    console.log('handle submit fiunctio');
    // dispatch(setEmployeeData(null))
    
    // window.location.href = '/employee'
    
  }

  return (
    <div className="@container">
      {/* <FormNav
        className={cn(
          layout === 'boron' && 'z-[999] 2xl:top-[72px]'
        )}
      />
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className={cn(
            'relative z-[19] [&_label.block>span]:font-medium',
            className
          )}
        >
          <div className="mb-10 grid gap-7 divide-y divide-dashed divide-gray-200 @2xl:gap-9 @3xl:gap-11">
            {Object.entries(MAP_STEP_TO_COMPONENT).map(([key, Component]) => (
              <Element key={key} name={formParts[key as keyof typeof formParts]}>
                {<Component className="pt-7 @2xl:pt-9 @3xl:pt-11" />}
              </Element>
            ))}
          </div>

          <FormFooter
            isLoading={isLoading}
            submitBtnText={slug ? 'Update Product' : 'Create Product'}
          />
        </form>
      </FormProvider> */}
      <input type='text'/>
      <button type='submit' onClick={()=>handleSub()}> Add Employee </button>
    </div>
  );
}
