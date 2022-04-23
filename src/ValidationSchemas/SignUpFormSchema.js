import * as yup from "yup"

export const SignUpFormSchema = yup.object().shape({
    email: yup
        .string()
        .email()
        .required()
    })
