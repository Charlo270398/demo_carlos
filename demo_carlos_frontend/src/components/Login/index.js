import { useState } from "react";
import ButtonComponent from '../Button';
import { useForm } from 'react-hook-form'
import { ErrorMessage } from '@hookform/error-message';
import "./Login.css"
import useUser from "../../hooks/useUser";
import loginService from "../../services/login";
import {useLocation} from "wouter"


export default function Login () {
    const { register, formState: { errors }, handleSubmit } = useForm();
    const [loading, setLoading] = useState(false);
    const [login_error, setLoginError] = useState({show: false, text: 'Error while registration process'});
    const {setJWTSession} = useUser()
    const [, navigate] = useLocation()

    const handleLogin = data => {
        setLoginError(false)
        setLoading(true)
        loginService(data).then((jwt) => {
            setJWTSession({jwt})
            navigate("/")
        }).catch((err) => {
            console.log(err)
            setLoginError({show: true, text: err.message})
        }).finally(() => {
            setLoading(false)
        })
    }

    return (
        <>
            <form className="form" onSubmit={handleSubmit(handleLogin)}>
                <div>
                    <label className="form_label" htmlFor="username">Username</label>
                    <input type='text' {...register("username", { required: "Username field is required." })} />
                </div>
                <div>
                    <label className="form_label" htmlFor="password">Password</label>
                    <input type='password' {...register("password", { required: "Password field is required." })} />
                </div>  
                <div>
                    <p>
                        <ErrorMessage errors={errors} name="username" />
                    </p>
                    <p>
                        <ErrorMessage errors={errors} name="password" />
                    </p>
                </div>
                <div className="form_footer">
                    <ButtonComponent primary >Login</ButtonComponent>
                    {loading && <p>Processing...</p>}
                    {login_error.show && <p>{login_error.text}</p>}
                </div>
            </form>
        </>
    )
}