import React, {useState} from 'react'
import { Form, Field } from 'react-final-form'
import {TextField, Button } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { setIn } from "final-form";
import { LoginFormSchema } from '../ValidationSchemas/LoginFormSchema';
import { useSelector, useDispatch } from 'react-redux'
import { setToken } from '../features/squares/userSlice';
import { login } from '../features/squares/userSlice';

export default function LoginForm() {

    const dispatch = useDispatch()

    axios.defaults.withCredentials = true;

    let navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


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
    };

    async function onSubmit(e){
        const {email, password} = e

        await dispatch(login({email, password})).unwrap();
        
        navigate('/', { replace: true })
    }

  return (
    <div>

        <Form  
            onSubmit={onSubmit}
            validate={validate(LoginFormSchema)}
            render={({ handleSubmit }) => (
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
                                error={Boolean(meta.touched && meta.error)}
                                helperText={meta.touched && meta.error && <span>{meta.error}</span>}
                                value={email}
                                type="email"
                                {...input}
                                
                            />
                            
                            </div>
                        )}
                    />

                    <Field
                        name="password"
                        render={({ input, meta }) => (
                            <div>
                            <TextField
                                fullWidth
                                margin="normal"
                                required
                                label="Password"
                                type="password"
                                value={password}
                                error={Boolean(meta.touched && meta.error)}
                                helperText={meta.touched && meta.error && <span>{meta.error}</span>}
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
                      //  onClick={loginHandler}
                        >
                        Sign In
                    </Button>
                </form>
            )
        }/>

        
       
            
    </div>
  )
}
