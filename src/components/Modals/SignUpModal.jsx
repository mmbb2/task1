import React, {useState} from 'react'
import { Typography, Button, Modal, Box,TextField} from '@mui/material'
import { Form, Field } from 'react-final-form'
import { setIn } from "final-form";
import { SignUpFormSchema } from '../../ValidationSchemas/SignUpFormSchema';
import AuthService from '../../services/AuthService';
import { FORM_ERROR } from 'final-form';
import { ModalStyles } from './modalStyles';

export default function SignUpModal({isOpen, handleClose, handleResultModalOpen}) {

    const [email, setEmail] = useState('');

    const validate = (schema) => async (values) => {
        if (typeof schema === 'function') {
            schema = schema();
        }
        try {
            await schema.validate(values, { abortEarly: false });
        } catch (err) {
            const errors = err.inner.reduce((formError, innerError) => {
                return setIn(formError, innerError.path, innerError.message);
            }, {});
            
            return errors;
        }
    }

    async function onSubmit(e){
        try{
            const {email} = e
       
            const credentials = await AuthService.registration(email);
            console.log(credentials)
            handleResultModalOpen(credentials)


        }catch (err) {
            if(err.response?.data.message){
                return { [FORM_ERROR]: err.response.data.message }
            }
            
        }
    }

  return (
  <>
    <Modal
        open={isOpen}
        onClose={handleClose}
      >
        <Box sx={ModalStyles}>
        <Form  
            onSubmit={onSubmit}
            validate={validate(SignUpFormSchema)}
            render={({ handleSubmit, submitError }) => (
                <form onSubmit={handleSubmit}>
                    <Field
                        name="email"
                        render={({ input, meta }) => (
                            <div>
                            <TextField
                                fullWidth
                                margin="normal"
                                required
                                label="Email Address"
                                autoComplete="email"
                                autoFocus
                                error={Boolean(meta.touched && (meta.error || submitError))}
                                helperText={meta.touched && (meta.error || submitError) && <span>{(meta.error || submitError) }</span>}
                                value={email}
                                type="email"
                                {...input}
                                
                            />
                            
                            </div>
                        )}
                    />
                    <Button 
                        type='submit'
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        >
                        Sign Up
                    </Button>
                </form>
            )
        }/>
        </Box>
      </Modal>

  </>
  )
}
