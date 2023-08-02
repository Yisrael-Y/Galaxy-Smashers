import { CircularProgress, TextField, Button, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useContext, useState } from 'react'
import newAxios from '../Axios'
import { authContext } from '../../context/authContext'


const Signup = () => {
  const [user, setUser] = useState({
    email:'',
    password:'',
    repassword:'',
    firstName:'',
    lastName:'',
    nickname:'',
  })
  const [errorMessage, setErrorMessage] = useState('')
  const [message, setMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const {setUserDetails} = useContext(authContext)

  const detailsChange = (e) => {
    setUser({...user, [e.name]:e.value})
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMessage('')
    setErrorMessage('')
    try {
      const response = await newAxios.post(`/users/signup`, user)
      setUserDetails(response.data)
      setMessage(response.data.message)
    } catch (error) {
      console.error(error)
      setErrorMessage(error.response.data)
    }
  }

  return (
    <>
      <div className='SignUpContainer'>
          <div className='SignUpTop'>
              <h2 className='SignUpHeadline'>START FOR FREE</h2>
              <h1 className='center'><span className='SignUpHeadline-black'>Create new account</span><span className='dot'>.</span></h1>
          </div>
          <form onSubmit={handleSubmit}>
                <Box>
                  <Box className='LoginTextInputsContainer'>
                    <TextField
                          label="First Name"
                          onChange={(e) => detailsChange(e.target)}
                          name='firstName'
                          type="text"
                          value={user.firstName}
                          required
                          fullWidth
                          margin="normal"
                      />
                      <TextField
                          label="Last Name"
                          onChange={(e) => detailsChange(e.target)}
                          name='lastName'
                          type="text"
                          value={user.lastName}
                          required
                          fullWidth
                          margin="normal"
                      />
                  </Box>
                    <TextField
                        className='LoginTextInputs'
                        label="Email"
                        onChange={(e) => detailsChange(e.target)}
                        name='email'
                        type="email"
                        value={user.email}
                        required
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        className='LoginTextInputs'
                        label="Password"
                        onChange={(e) => detailsChange(e.target)}
                        name='password'
                        type="password"
                        value={user.password}
                        required
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        className='LoginTextInputs'
                        label="Re-type password"
                        onChange={(e) => detailsChange(e.target)}
                        name='repassword'
                        type="password"
                        value={user.repassword}
                        required
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        className='LoginTextInputs'
                        label="Nickname"
                        onChange={(e) => detailsChange(e.target)}
                        name='nickname'
                        type="text"
                        value={user.nickname}
                        required
                        fullWidth
                        margin="normal"
                    />
                    <Button sx={{
                      background: '#ff8484',
                      '&:hover': {
                        background: '#ff8484',
                      }
                    }} fullWidth variant="contained" type="submit" className='LoginButton' >
                        Sign up
                    </Button>
                    {errorMessage && <Typography className='ErrorMessage'>{errorMessage}</Typography>}
                    {message && <Typography className='Success'>{message}</Typography>}
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

export default Signup