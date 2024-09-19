import React, { useState } from 'react'
import FormLayout from './FormLayout'
import { Button, TextField, Typography } from '@mui/material'

const ForgotPassword = () => {
    const [state, setState] = useState({
        password: "",
        confirmPassword: ""
    })

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setState({ ...state, [name]: value })
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
            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
            // onClick={handleFormSubmit}
            >
                Reset Password
            </Button>
        </FormLayout>
    )
}

export default ForgotPassword
