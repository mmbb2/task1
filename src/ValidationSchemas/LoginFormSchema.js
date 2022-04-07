import * as yup from "yup"

export const LoginFormSchema = yup.object().shape({
    email: yup
        .string()
        .email()
        .required(),
    password: yup
        .string()
        .min(6)
        .matches(/^[a-zA-Z0-9]+$/ && /(?:[^`!@#$%^&*\-_=+'\/.,]*[`!@#$%^&*\-_=+'\/.,]){2}/, 'Only alphabet numbers and 2 special symbol on your choice')
        .required()
    })
