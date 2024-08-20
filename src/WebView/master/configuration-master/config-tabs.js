import React, { useState } from 'react'
import { Text } from 'rizzui';
import cn from '../../../Utils/class-names';
import useValidation from '../../..//Hooks/useValidation';
import { ConfigmenuItems } from './config-menu-tems';
import CustomInput from '../../../Component/ui/form/input/custom-input';
import CustomSelect from '../../../Component/ui/form/select/custom-select';
import CustomButton from '../../../Component/ui/buttons/custom-button';
import { setConfigurationError, setConfigurationMasterApiJson } from '../../../Store/Action/master/configuration-master/configuration-master-action';
import { useDispatch, useSelector } from 'react-redux';
import { configurationMasterSchema } from '../../../Utils/validators/master/configuration-master/configuration-master-scheema';
import { CompileConfigurationJson } from './tabs-summary/CompileJson';


export default function ConfigTabs() {

    const [selected, setSelected] = useState(0)
    const dispatch = useDispatch()
    const reduxConfiguration = useSelector(state => state.ConfigurationMasterReducer)

    const { errors, validate } = useValidation(configurationMasterSchema);


    const handleClick = (index) => {

        setSelected(index)
    }
    const GenderOption = [
        { id: 'male', label: 'Male', value: 'male' },
        { id: 'female', label: 'Female', value: 'female' },
        { id: 'other', label: 'Other', value: 'other' },
    ]



    const handleSubmit = (e) => {
        e.preventDefault();
        var json = reduxConfiguration?.apiJson

        const validationErrors = validate(json);
        dispatch(setConfigurationError(validationErrors))

        if (Object.keys(validationErrors).length === 0) {

            CompileConfigurationJson(reduxConfiguration?.apiJson).then(compiledData => {

                // if (row?.id) {
                //     Object.assign(json, { id: row?.id })
                //     HitApi(json, updateGeneral).then((result) => {

                //     })
                // } else {
                //     Object.assign(json, { status: json?.status || 'active' })
                //     HitApi(json, addGeneral).then((result) => {

                //     })
                // }
            })


        } else {
        }
    };






    return (
        <div>

            <div className='bg-white p-5 mb-5 rounded-xl'>
                <div className='grid grid-cols-3 gap-x-4'>
                    <CustomInput important={true} name="name" label="End point name" value={reduxConfiguration?.apiJson?.name} error={reduxConfiguration?.error} reduxState={reduxConfiguration?.apiJson} setAction={setConfigurationMasterApiJson} />
                    <CustomInput important={true} name="description" label="End point Description" value={reduxConfiguration?.apiJson?.description} error={reduxConfiguration?.error} reduxState={reduxConfiguration?.apiJson} setAction={setConfigurationMasterApiJson} />
                    <CustomSelect name="type" label="End point type" options={GenderOption} value={reduxConfiguration?.apiJson?.type} error={reduxConfiguration?.error} reduxState={reduxConfiguration?.apiJson} setAction={setConfigurationMasterApiJson} />
                </div>
            </div>
            <div className='bg-white p-5 rounded-xl'>
                <div className='bg-white border-b'>
                    <div className="relative flex items-center overflow-hidden">
                        <div className="flex h-[52px] items-start overflow-hidden">
                            <div className="-mb-7 flex w-full gap-3 overflow-x-auto scroll-smooth pb-7 md:gap-5 lg:gap-8" >
                                {ConfigmenuItems.map((menu, index) => (
                                    <label
                                        onClick={() => handleClick(index)}
                                        key={`menu-${index}`}
                                        className={cn(
                                            'group relative cursor-pointer whitespace-nowrap py-2.5 font-medium text-gray-500 before:absolute before:bottom-0 before:left-0 before:z-[1] before:h-0.5 before:bg-gray-1000 before:transition-all before:duration-300 hover:text-gray-900',
                                            index === selected
                                                ? 'before:visible before:w-full before:opacity-100 font-bold'
                                                : 'before:invisible before:w-0 before:opacity-0 hover:before:visible hover:before:w-full hover:before:opacity-100'
                                        )}
                                    >
                                        <Text
                                            as="span"
                                            className={cn('inline-flex rounded-md px-2.5 py-1.5 transition-all duration-200', index === selected ? ' font-bold' : '')}
                                        >
                                            {menu.label}
                                        </Text>
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div>{ConfigmenuItems?.[selected]?.Screen}</div>
            </div>
            <div className='flex  mt-5'>
                <CustomButton type={'submit'} className={'w-[15vw]'} text={'Submit'} onClick={handleSubmit} />
            </div>
        </div>
    )
}
