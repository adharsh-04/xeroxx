import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userAdminLoginThunk } from '../Redux/slices/userAdminSlice';

function Signin() {
    const { register, handleSubmit } = useForm();
    const { loginUserStatus, errorOccured, errMsg, currentUser } = useSelector(state => state.userAdminLoginReducer);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    function handleFormSubmit(userObj) {
        console.log(userObj);
        dispatch(userAdminLoginThunk(userObj));
    }

    useEffect(() => {
        if (loginUserStatus) {
            if (currentUser.type === 'user') {
                navigate('/userprofile');
            } else if (currentUser.type === 'admin') {
                navigate('/adminprofile');
            }
        }
    }, [loginUserStatus, errorOccured, errMsg, navigate, currentUser]);

    return (
        <div>
            <h3 className='text-center'>Login Form</h3>
            <form className='w-50 d-block mx-auto' onSubmit={handleSubmit(handleFormSubmit)}>
                <div className='m-3'>
                    <label htmlFor='type' className='form-label'>UserType</label>
                    <br />
                    <div className='d-flex'>
                        <div className='me-3'>
                            <input type='radio' id='user' value='user' name='type' {...register('type', { required: true })} />
                            <label htmlFor='user' className='form-label'>User</label>
                        </div>
                        <div className='me-3'>
                            <input type='radio' id='admin' value='admin' name='type' {...register('type', { required: true })} />
                            <label htmlFor='admin' className='form-label'>Admin</label>
                        </div>
                    </div>
                </div>
                <div className='m-3'>
                    <label htmlFor='username' id='username' className='form-label'>Username</label>
                    <input type='text' id='username' className='form-control' placeholder='Enter username' {...register('username', { required: true })} />
                </div>
                <div className='m-3'>
                    <label htmlFor='password' id='password' className='form-label'>Password</label>
                    <input type='password' id='password' className='form-control' placeholder='Enter password' {...register('password', { required: true })} />
                </div>
                <button className='btn btn-success d-block mx-auto'>Login</button>
            </form>
            {errorOccured && <div className='alert alert-danger'>{errMsg}</div>}
        </div>
    );
}

export default Signin;
