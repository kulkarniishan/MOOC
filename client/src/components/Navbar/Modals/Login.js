import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { axiosInstance } from '../../../axiosSetup';
import { useDispatch } from 'react-redux'
import { login } from '../../../Redux/features/userSlice'
import { yupResolver } from '@hookform/resolvers/yup'
import { setWarning } from '../../../Redux/features/warningSlice'
import './Login.css'

let schema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().min(6).max(15).required()
});



export default function Login(props) {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });
    const [accountExists, setAccountExists] = useState(true)
    const history = useHistory()
    const dispatch = useDispatch();

    const onSubmit = data => {
        axiosInstance.post('/auth/login.php', data, { withCredentials: true })
            .then(response => {
                console.log(response);
                setAccountExists(true)
                dispatch(login(response.data.user))
                history.push('/Users')
                props.toggleloginModal()
                dispatch(setWarning({
                    type: 'success', message: 'You have successfully logged in.'
                }))
            })
            .catch(error => {
                if (error.status === 401) {
                    setAccountExists(false)
                }
                console.log(error.response)
            });
    }

    return (
        <>
            <Modal show={props.loginOpen} centered onHide={props.toggleloginModal} size="md" className="shrink-width">
                <Modal.Header closeButton>
                    <Modal.Title>Login</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='initialDisplay'>
                        <div className="col">

                            <div className="row justify-content-center" style={{ position: 'relative' }}>
                                <div style={{
                                    borderBottom: '1px solid #d8d8d8',
                                    display: 'inline-block',
                                    left: '0',
                                    top: '12px',
                                    position: 'absolute',
                                    width: '100%'
                                }}></div>
                            </div>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="row my-2">
                                    <div className="col">
                                        <div className="row mb-2">
                                            <input type="email" name="email" id="email" placeholder='Email Address' className='w-100 form-control'{...register('email')} />
                                            {errors.email && <p className='alert alert-danger mt-1 py-1 w-100'>{errors.email.message}</p>}
                                        </div>
                                        <div className="row mb-0">
                                            <input type="password" name="password" id="password" placeholder='Password' className='w-100 form-control'{...register('password')} />
                                            {errors.password && <p className='alert alert-danger mt-1 py-1 w-100'>{errors.password.message}</p>}
                                        </div>
                                    </div>
                                </div>
                                {!accountExists && <div className="row"><div className="col alert alert-danger mt-1 py-1 w-100">Email Id or Password is incorrect.</div></div>}
                                <div className="row mb-1" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <div></div>
                                    <div><Link to='/forgotPassword'>Forgot Password?</Link></div>
                                </div>
                                <div className="row">
                                    <input type="submit" value="Login" className="btn py-2 px-3 modal-aqua-green-filled w-100" />
                                </div>
                            </form>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <div>
                        <span>Not a Member Yet?</span>
                    </div>
                    <div>
                        <button className="btn modal-aqua-green" data-modal="log-in" onClick={props.toggleBetweenTheModals}>Sign Up</button>
                    </div>
                </Modal.Footer>
            </Modal>
        </>
    )
}
