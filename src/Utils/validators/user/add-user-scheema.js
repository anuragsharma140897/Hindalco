
// export const addUserSchema = z.object({
//     firstName: z.string().min(1, { message: 'First Name is Required *' }),
//     lastName: z.string().min(1, { message: 'Last Name is Required *' }),
//     userName: z.string().min(1, { message: 'User Name is Required *' }),
//     password: z.string()
//         .min(6, { message: 'Password must be at least 6 characters long *' })
//         .regex(/[a-z]/, { message: 'Password must contain at least one lowercase letter *' })
//         .regex(/[A-Z]/, { message: 'Password must contain at least one uppercase letter *' })
//         .regex(/\d/, { message: 'Password must contain at least one number *' })
//         .regex(/[@$!%*?&#]/, { message: 'Password must contain at least one special character *' }),
//     contactno: z.string().regex(/^\d{10}$/, { message: 'Contact number is Invalid *' }),
//     address: z.string().min(1, { message: 'Address is Required *' }),
//     email: z.string().email({ message: 'Email must be a valid email address *' }),
//     employeeID: z.string().min(1, { message: 'Employee ID is Required *' }),
//     roleName: z.string().nonempty({ message: 'Role is Required *' })
//         .refine(value => validRoles.includes(value), { message: 'Invalid Role *' }),
//     gender: z.string().nonempty({ message: 'Gender is Required *' })
//         .refine(value => validGenders.includes(value), { message: 'Invalid Gender *' }),
// });

import { validationSchema } from "../validationSchema";

export const addUserSchema = {
    firstName: validationSchema?.string('First Name is Required').min(1, { message: 'First Name is Required' }),
    lastName: validationSchema?.string('Last Name is Required').min(1, { message: 'Last Name is Required' }),
    username: validationSchema?.string('Username is Required').min(1, { message: 'Username Name is Required' }),
    // password: validationSchema?.string('Password is Required').min(1, { message: 'Password is Required' }),
    gender: validationSchema?.string('Gender is Required').min(1, { message: 'Gender is Required' }),
    roleName: validationSchema?.string('Role is Required').min(1, { message: 'Role is Required' }),
    contact: validationSchema?.string('Contact No is Required').min(1, { message: 'Contact No is Required' }),
    address: validationSchema?.string('Address is Required').min(1, { message: 'Address is Required' }),
    email: validationSchema?.string('Email is Required').min(1, { message: 'Email is Required' }),
    employeeId: validationSchema?.string('Employee ID  is Required').min(1, { message: 'Employee ID  is Required' }),
};
