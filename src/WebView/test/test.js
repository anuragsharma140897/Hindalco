import React, { useEffect, useState } from 'react'
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import CustomInput from '../../Component/ui/form/input/custom-input';

let inputClass = 'form-input mt-1.5 w-full rounded-lg border border-slate-300 bg-transparent px-3 py-2'
let disabledClass = 'form-input mt-1.5 w-full rounded-lg border border-slate-300 bg-slate-200 px-3 py-2'

export default function AddUser({ setShow }) {
    const dispatch = useDispatch()
    const reduxSiteMaster = useSelector(state => state.SiteMasterReducer)

    const validationSchema = Yup.object().shape({
        siteName: Yup.string()
            .required('stateName is required'),

    });

    const formOptions = { resolver: yupResolver(validationSchema) };
    const { register, handleSubmit, formState, setError } = useForm(formOptions);
    const { errors } = formState;


    useEffect(() => {

    }, [])

    const handleChange = (e, fieldName) => {
        var json = reduxSiteMaster?.apiJson
        Object.assign(json, { [fieldName]: e?.target?.value });
    }

    const onSubmit = (data) => {
        var json = reduxSiteMaster?.apiJson

    }
    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>

                <div className='grid grid-cols-3 gap-4 my-3'>
                    <CustomInput label={'Site Name'} json={reduxSiteMaster?.apiJson} register={register} errors={errors} fieldName={'siteName'}/>
                </div>

                <div className='grid grid-cols-3 gap-4 my-3'>
                    <button className="btn space-x-2 bg-primary font-medium text-white hover:bg-primary-focus focus:bg-primary-focus active:bg-primary-focus/90 dark:bg-accent dark:hover:bg-accent-focus dark:focus:bg-accent-focus dark:active:bg-accent/90">
                        <span>Add User</span>
                    </button>
                </div>

            </form>
        </div>
    )
}
