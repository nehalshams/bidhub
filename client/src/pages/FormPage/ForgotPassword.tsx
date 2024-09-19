import React, { useState } from 'react'
import FormLayout from './FormLayout'
import { Button, TextField, Typography } from '@mui/material'
import { useResetPasswordMutation } from '../../api';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
    const searchParams = new URLSearchParams(window.location.search);

    const token = searchParams.get('token')
    const navigate = useNavigate()

    const [state, setState] = useState({
        password: "",
        confirmPassword: ""
    })

    const [resetPassword ] = useResetPasswordMutation()

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setState({ ...state, [name]: value })
    }
    const handlePasswordReset = async () => {
        if(state.confirmPassword !== state.password){
           return toast.error("Password didn't match")
        }
        const resp = await resetPassword({
            token,
            password: state.password
        })
        if(resp.error){
            const err = resp.error as any
            toast.error(err.data.message)
        }else{
            navigate('/sign-in')
        }
    }
    return (
        <FormLayout>
            <Typography component="h1" variant="h5">
                Reset Password
            </Typography>
            <TextField
                onChange={handlePasswordChange}
                required
                fullWidth
                id="password"
                label="Paasword"
                name="password"
                size="small"
                value={state.password}
                sx={{ margin: "1rem 0" }}
            />
            <TextField
                onChange={handlePasswordChange}
                required
                fullWidth
                id="confirmPassword"
                label="Confirm Paasword"
                name="confirmPassword"
                size="small"
                value={state.confirmPassword}
            />
            {
                state.confirmPassword && state.confirmPassword !== state.password && (
                    <Typography variant='caption'>Password didn't match</Typography>
                )
            }
            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={handlePasswordReset}
            >
                Reset Password
            </Button>
        </FormLayout>
    )
}

export default ForgotPassword
