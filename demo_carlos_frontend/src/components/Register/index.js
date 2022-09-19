import { useState } from "react";
import registerService from "../../services/register";
import ButtonComponent from '../Button';
import { useForm } from 'react-hook-form'
import { ErrorMessage } from '@hookform/error-message';
import "./Register.css"
import checkPassword from "../../utils/checkPassword";
import useUser from "../../hooks/useUser";
import {useLocation} from "wouter"


export default function Register () {
    const { register, setError, formState: { errors }, handleSubmit } = useForm();
    const [loading, setLoading] = useState(false);
    const [register_error, setRegisterError] = useState({show: false, text: 'Error while registration process'});
    const {setJWTSession} = useUser()
    const [, navigate] = useLocation()

    const handleRegister = data => {
        const checkedPassword = checkPassword(data.password)
        if(checkedPassword.result === false){
            setError("password", { type: "focus", message: checkedPassword.error }, { shouldFocus: true });
        } else {
            setRegisterError(false)
            setLoading(true)
            registerService(data).then((jwt) => {
                setJWTSession({jwt})
                navigate("/")
            }).catch((err) => {
                console.log(err)
                setRegisterError({show: true, text: err.message})
            }).finally(() => {
                setLoading(false)
            })
        }
    }

    return (
        <>
            <form className="form" onSubmit={handleSubmit(handleRegister)}>
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
                    <ButtonComponent primary >Registrarse</ButtonComponent>
                    {loading && <p>Processing...</p>}
                    {register_error.show && <p>{register_error.text}</p>}
                </div>
            </form>
        </>
    )
}