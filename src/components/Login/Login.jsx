import { Box, CircularProgress, TextField, Button } from '@mui/material';
import React, { useState } from 'react'

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('')
    const [message, setMessage] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log('test');
    }

  return (
    <>
        <div className='SignUpContainer'>
            <div className='SignUpTop'>
                <h1 className='center'><span className='SignUpHeadline-black'>Welcome Back</span><span className='dot'>.</span></h1>
                <h2 className='SignUpHeadline'>Please sign in to your account.</h2>
            </div>
            <form onSubmit={handleSubmit}>
                <Box>
                    <TextField
                        className='LoginTextInputs'
                        label="Email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        className='LoginTextInputs'
                        label="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        fullWidth
                        margin="normal"
                    />
                    <Button variant="contained" type="submit" className='LoginButton' >
                        Log in
                    </Button>
                    {errorMessage && <span className='ErrorMessage'>{errorMessage}</span>}
                    {message && <span className='Success'>{message}</span>}
                    {isLoading 
                    && 
                    <Box className='LoaderContainer'>
                        <CircularProgress />
                    </Box> }
                </Box>
            </form>
        </div>
    </>
  )
}

export default Login