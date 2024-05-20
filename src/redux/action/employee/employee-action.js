import * as t from '@/redux/types'

export const setEmployeeData = (data) => ({ type: t?.SET_EMPLOYEE_DATA, value: data });
export const setEmployeeJson = (data) => ({ type: t?.SET_EMPLOYEE_JSON, value: data });
