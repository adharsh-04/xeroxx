import React from 'react'
import {useForm} from 'react-hook-form'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { useState } from 'react';

function Signup() {
  let{register,handleSubmit}=useForm();
  let navigate=useNavigate();
    let [err,setErr]=useState('');

   async function handleFormSubmit(userObj){
    try{
       
        if(userObj.type==='user'){
        let res=await axios.post('http://localhost:3000/userapi/register',userObj);
       console.log("response is",res);
        if(res.data.message==='User registered successfully'){
            navigate('/signin');
        }
        else{
            setErr(res.data.message);
        }}
        else if(userObj.type==='author'){
            let res=await axios.post('http://localhost:3000/authorapi/author',userObj);
           
            if(res.data.message==='author registered'){
                navigate('/signin');
            }
            else{
                setErr(res.data.message);
            }
        }
    }catch (error) {
        setErr(error.response.data.message);
        console.log(err);
    }
       
    }

  
 
  return (
    <div>
      <h3 className='text-center '>Registration form</h3>
      <form className='w-50 d-block mx-auto' onSubmit={handleSubmit(handleFormSubmit)}>
            <div className='m-3 '>
            <label htmlFor='type form-label'>UserType</label>
            <br></br>
            <div className='d-flex '>
            <div className='me-3'>
            <input type='radio' id='user' value='user' name='type' {...register('type',{required:true})} />
            <label htmlFor='user' className='form-label'>User</label>
            </div>
            <div className='me-3'>
            <input type='radio' id='admin' value='admin' name='type' {...register('type',{required:true})}/>
            <label htmlFor='admin' className='form-label'>Admin</label>
            </div>
            </div>
            </div>

        <div className='m-3'>
          <label htmlFor='username' id='username' className='form-label'>Username</label>
          <input type='text' id='username' className='form-control' placeholder='Enter username' {...register('username',{required:true})}/>
        </div>
        <div className='m-3'>
          <label htmlFor='email' id='email' className='form-label'>Email</label>
          <input type='email' id='email' className='form-control' placeholder='Enter email' {...register('email',{required:true})}/>
        </div>
        <div className='m-3'>
          <label htmlFor='password' id='password' className='form-label'>Password</label>
          <input type='password' id='password' className='form-control' placeholder='Enter password' {...register('password',{required:true})}/>
        </div>
        <button className='btn btn-danger d-block mx-auto'>Register</button>
      </form>
    </div>
  )
}

export default Signup