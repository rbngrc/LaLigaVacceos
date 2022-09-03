import React, { useState } from 'react'
import { Link } from "react-router-dom";
import { useForm } from '../../hooks/useForms';
import { useDispatch, useSelector } from 'react-redux';
import validator from "validator";
import Axios from 'axios';

import"../../styles/registerScreen.css"

import { removeError, setError } from '../../actions/ui';
import { startRegisterUserPassword } from '../../actions/auth';

import { url } from '../../constans';

export const RegisterScreen = () => {

    const addAthlete = () => {
        Axios.post(`${url}atheletes`, 
        {
            email: email,
            name: name,
            nickname: nickname,
            password: password,
            sex: sex,
        }).then(() => {
            setAthlete([...athlete, {
                email: email,
                name: name,
                nickname: nickname,
                password: password,
                sex: sex,
            }])
        })
    };

    const dispatch = useDispatch();
    const { msgError } = useSelector(state => state.ui);
    const [athlete, setAthlete] = useState([])

    const [formValues, handleInputChange] = useForm({
        email: "",
        nickname: "",
        name: "",
        password: "",
        password2: "",
        sex:"",
})

const {email, name, nickname, password, password2, sex} = formValues;

const handleRegister = (e) => {
    e.preventDefault();

    if (isFormValid()) {
        dispatch( startRegisterUserPassword(email, name, nickname,password, password2, sex) );
        addAthlete();
    }
}

const isFormValid = () => {
    if(name.trim().length === 0 ) {
        dispatch(setError("Se requiere nombre"))
        return false;
    } else if (!validator.isEmail(email)) {
        dispatch(setError("Email no válido"))
        return false;
    } else if (password !== password2 || password.length < 5) {
        dispatch(setError("Las contraseñas deben coincidir y tener al menos 6 caracteres"))
        return false;
    }
    
    dispatch(removeError())
    return true;
}

  return (
    <form 
            className="login-box"
            onSubmit={handleRegister}
        >
            <h1>Registrarse</h1>
            <div className="textbox">
                <input 
                    type="text" 
                    placeholder="Email" 
                    name="email" 
                    autoComplete="off"
                    value={email}
                    onChange={handleInputChange}
                />
            </div>
            <div className="textbox">
                <input 
                    type="text" 
                    placeholder="Nombre" 
                    name="name" 
                    autoComplete="off"
                    value={name}
                    onChange={handleInputChange}
                />
            </div>
            <div className="textbox">
                    <input 
                        type="text" 
                        placeholder="Apodo" 
                        name="nickname" 
                        autoComplete="off"
                        value={nickname}
                        onChange={handleInputChange}
                    />
                </div>
            <div className="textbox">
                <input 
                    type="password" 
                    placeholder="Contraseña" 
                    name="password" 
                    autoComplete="off"
                    value={password}
                    onChange={handleInputChange}
                />
            </div>
            <div className="textbox">
                <input 
                    type="password" 
                    placeholder="Repita la contraseña" 
                    name="password2" 
                    autoComplete="off"
                    value={password2}
                    onChange={handleInputChange}
                />
            </div> 
            <div className="textbox">
                <select 
                    className="textcombo"
                    name="sex"
                    onChange={handleInputChange}
                >
                    <option>Seleccione sexo</option>
                    <option>Femenino</option>
                    <option>Masculino</option>
                </select>
            </div> 

            {
                msgError &&
                <div className="alert-error">
                    <p>{msgError}</p>
                </div>
            }
            
            <button 
                className="btn" 
                type="submit" 
            >
                Confirmar
            </button>
            <Link
                className="btn"
                to="/auth/acceso"
            >
                Volver
            </Link>
        </form>
  )
}
