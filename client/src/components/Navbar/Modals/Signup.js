import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { RadioGroup, FormControlLabel, Radio, withStyles } from '@material-ui/core'
import { axiosInstance } from '../../../axiosSetup';
import { useDispatch } from 'react-redux'
import { login } from '../../../Redux/features/userSlice'
import { useHistory } from 'react-router-dom'
import { setWarning } from '../../../Redux/features/warningSlice'
import './SignUp.css'

const GreenRadio = withStyles({
    root: {
        color: "rgb(0, 196, 152)",
        "&$checked": {
            color: "rgb(0, 196, 152)"
        }
    },
    checked: {}
})((props) => <Radio color="default" {...props} />);

let schema = yup.object().shape({
    firstname: yup.string().required(),
    lastname: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().min(6).max(15).required(),
    gender: yup.string().required(),
});

export default function SignUp(props) {
    const [emailExists, setemailExists] = useState(false)
    const dispatch = useDispatch()
    const history = useHistory()

    const { register, handleSubmit, control, formState: { errors }, setValue } = useForm({
        resolver: yupResolver(schema),
    });
    console.log(errors);
    const onSubmit = data => {
        axiosInstance.post('auth/signup.php', data, { withCredentials: true })
            .then(response => {
                setemailExists(false)
                setValue('firstname', '');
                setValue('lastname', '');
                setValue('email', '');
                setValue('password', '')
                setValue('gender', 'Male');
                console.log(response);
                dispatch(login(response.data.user))
                history.push('/profile')
                props.togglesignupModal()
                dispatch(setWarning({
                    type: 'success', message: 'You have successfully signed in.'
                }))

            })
            .catch(error => {
                // console.log(error.response);
                // if (error.response.status === 409) {
                //     setemailExists(true)
                //}
               // console.log(error.response)
            });
    }

    return (
        <div>
            <Modal show={props.signupOpen} centered onHide={props.togglesignupModal} dialogClassName="my-modal">
                <Modal.Header closeButton>
                    <Modal.Title className='mx-auto'>Sign Up</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <div>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="col">

                                <div className="row my-2">
                                    <div className="col">
                                        <div className="row mb-3">
                                            <input type="text" name="firstname" id="firstname" placeholder='First Name' className='w-100 form-control' {...register('firstname')} />
                                            {errors.firstname && <p className='alert alert-danger mt-1 py-1 w-100'>{errors.firstname.message}</p>}
                                        </div>
                                        <div className="row mb-3">
                                            <input type="text" name="lastname" id="lastname" placeholder='Last Name' className='w-100 form-control'  {...register('lastname')} />
                                            {errors.lastname && <p className='alert alert-danger mt-1 py-1 w-100'>{errors.lastname.message}</p>}
                                        </div>
                                        <div className="row mb-3">
                                            <input type="email" name="email" id="email" placeholder='Email Address' className='w-100 form-control'  {...register('email')} />
                                            {(errors.email || emailExists) && <p className='alert alert-danger mt-1 py-1 w-100'>{errors.email && errors.email.message}{emailExists && 'Email Id is taken'}</p>}
                                        </div>
                                        <div className="row mb-3">
                                            <input type="password" name="password" id="password" placeholder='Password' className='w-100 form-control'  {...register('password')} />
                                            {errors.password && <p className='alert alert-danger mt-1 py-1 w-100'>{errors.password.message}</p>}
                                        </div>
                                    </div>
                                </div>
                                <div className="row my-2">
                                    <div className="col">

                                        <Controller
                                            rules={{ required: true }}
                                            control={control}
                                            defaultValue="Male"
                                            name="gender"
                                            render={({ field }) => (
                                                <RadioGroup {...field}>
                                                    <FormControlLabel
                                                        value="Male"
                                                        control={<GreenRadio />}
                                                        label="Male"
                                                    />
                                                    <FormControlLabel
                                                        value="Female"
                                                        control={<GreenRadio />}
                                                        label="Female"
                                                    />
                                                </RadioGroup>)
                                            }
                                        />
                                    </div>
                                </div>
                                <div className="row my-2">
                                    <div className="col">
                                        <input type="submit" value="Sign Up with Email" className="btn py-2 px-3 modal-aqua-green-filled w-100" />
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>

                </Modal.Body>
                <Modal.Footer>
                    <div>
                        <span>Already a Member?</span>
                    </div>
                    <div>
                        <button className="btn modal-aqua-green" data-modal="log-in" onClick={props.toggleBetweenTheModals}>Log In</button>
                    </div>
                </Modal.Footer>
            </Modal>
        </div>
    )
}
