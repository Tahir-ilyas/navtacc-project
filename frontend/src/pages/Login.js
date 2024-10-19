import React, { useEffect, useState } from 'react'
import { Form, Input, message } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Password from 'antd/es/input/Password'
import Spinner from '../component/Spinner'

const Login = () => {
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const submitHandler = async (values) => {
        try {
            setLoading(true)
           const {data} = await axios.post('http:localhost:8080/api/v1/users/login', values)
           setLoading(false)
           message.success('login success')
           localStorage.setItem(
            'user', 
            JSON.stringify({...data.user,password: '' })
        );
           navigate('/')
        }catch(error){
            setLoading(false)
            message.error('somthing went rong')
        }
    }
    // prevent login user
    useEffect(() => {
        if(localStorage.getItem('user')){
            navigate('/')
        }
    },[navigate])
  return (
    <>
        <div className='register-page'>
            {loading && <Spinner />}
           <Form layout='vertical' onFinish={submitHandler}>
            <h1>Login Form</h1>
            <Form.Item label='Email' name='email' >
                <Input type='email' />
            </Form.Item>
            <Form.Item label='Password' name='password' placeholder='enter the password'>
                <Input type='password' />
            </Form.Item>
            <div className='d-flex justify-content-between'>
                <Link to="/register">Not a user ? Click here to Register</Link>
                
                <button className='btn btn-primary'>Login</button>
            </div>
           </Form>
        </div>
    </>
  )
}

export default Login