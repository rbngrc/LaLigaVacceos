import React from 'react'
// import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
// import { removeError, setError } from '../../actions/ui';
// import { useForm } from '../../hooks/useForm';
// import validator from "validator";

import '../../styles/log_reg_screen/loginScreen.css'; 

export const LoginScreen = () => {

    // const dispatch = useDispatch();
    // const {loading, msgError} = useSelector(state => state.ui);

    // const [formValues, handleInputChange] = useForm({
    //     email: "",
    //     password: ""
    // });

    // const handleLogin = (e) => {
    //     e.preventDefault();

    //     if (isFormValid()) {
    //         dispatch(checkUser(email, password))   
    //     }
    // }

    // const {email, password} = formValues;

    // const isFormValid = () => {
    //      if (!validator.isEmail(email)) {
    //         dispatch(setError("Email no válido"))
    //         return false;
    //     } else if (password.length < 5) {
    //         dispatch(setError("Las contraseñas debe tener al menos 6 caracteres"))
    //         return false;
    //     } 

    //     dispatch(removeError())
    //     return true;
    // }

    // const handleResetPassword = (mail) => {
    //     // resetear password w/ email
    // }

    return (
        <form 
            className="login-box"
            // onSubmit={handleLogin}
        >
            <h1>Accede</h1>
            <div className="textbox">
                <input 
                    type="text" 
                    placeholder="Email"
                    name="email"
                    autoComplete="off"
                    // value={email}
                    // onChange={handleInputChange}
                />
            </div>
            <div className="textbox">
                <input 
                    type="password" 
                    placeholder="Contraseña" 
                    name="password"
                    autoComplete="off"
                    // value={password}
                    // onChange={handleInputChange}
                />
            </div>
            {/* {
                msgError &&
                <div className="alert-error">
                    <p>{msgError}</p>
                </div>
            } */}

            {/* <div className="forgot-passwod">
                {<p onClick={handleResetPassword}>Restablecer contraseña</p>}
            </div>
             */}
            <button 
                className="btn" 
                type="submit" 
                // disabled={loading}
            >
                Acceder
            </button>
            <Link
                className="btn"
                to="/signin"
            >
                Registrarse
            </Link>
        </form>
    )
}