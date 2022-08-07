import React from 'react';
import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from '../../hooks/useForms';
import Axios from 'axios';

import '../../styles/insertData.css';

import { removeError, setError } from '../../actions/ui';

export const PlayerInfoScreen = () => {

    const { name } = useSelector(state => state.auth);
    const [competitionList, setCompetitionList] = useState([]);
    const [athleteList, setAthleteList] = useState([]);
    // const [competitionName, setName] = useState("");

    const getAthletes = (name) => {
        Axios.get('http://localhost:3001/atletas/'+ name).then((response) => {
            setAthleteList(response.data);
          })
    }

    const getCompetitions = () => {
        Axios.get('http://localhost:3001/competiciones').then((response) => {
          setCompetitionList(response.data)
          })
    }

    getCompetitions();

    const showdata = (e) => {
        e.preventDefault();
            getAthletes(name);
    }

  return (
    <div className="data-card">
        <div className="wod-title">
            <h1>Datos personales</h1>
            <hr/>
        </div>

            <form 
                className="info-box"
                onSubmit={showdata}
            >
                <button 
                    className="btn" 
                    id="btn-info"
                    type="submit"
                >
                    Mostrar
                </button>
            </form>
        <div>
        {
            athleteList.map((val, key) => {
                console.log(val.name)
                return(
                    <form 
                        className="info-box"
                        // onSubmit={handleInputChange}
                        key={val.name}
                    >
                        <div className="textbox">
                            <label>Nombre</label>
                            <input 
                                type="text" 
                                placeholder="Nombre" 
                                name="name" 
                                autoComplete="off"
                                required
                                // value={name}
                            />
                        </div>
                        <div className="textbox">
                            <label>Email</label>
                            <input 
                                type="text" 
                                placeholder="Email" 
                                name="email" 
                                autoComplete="off"
                                required
                                //value={val.email}
                            />
                        </div>
                        <div className="textbox">
                            <label>Apodo</label>
                            <input 
                                type="text" 
                                placeholder="Apodo" 
                                name="nickname" 
                                autoComplete="off"
                                required
                                // value={nickname}
                            />
                        </div>
                        <div className="textbox">
                            <label>Contraseña</label>
                            <input 
                                type="password" 
                                placeholder="Contraseña" 
                                name="password" 
                                autoComplete="off"
                                required
                                // value={password}
                            />
                        </div>
                        <div className="textbox">
                            <label>Repita la contraseña</label>
                            <input 
                                type="password" 
                                placeholder="Repita la contraseña" 
                                name="password2" 
                                autoComplete="off"
                                required
                                // value={password2}
                            />
                        </div> 
                        <div className="textbox">
                            <input type="text"/>
                            <label>Seleccione su sexo</label>
                            <select 
                                className="textcombo"
                                name="sex"
                            >
                                {/* <option>{sex}</option> */}
                                <option>Femenino</option>
                                <option>Masculino</option>
                            </select>
                        </div> 
                        <div className="textbox">
                            <input type="text"/>
                            <label>Seleccione competición</label>

                            <select 
                                className="textcombo"
                                name="competition"
                            >
                            {
                                competitionList.map((val, key) => {
                                    return (
                                        <option key={val.name}>{val.name}</option>
                                    )
                                })
                            }
                            </select>
                        </div> 
                        {/* {
                        msgError &&
                        <div className="alert-error">
                            <p>{msgError}</p>
                        </div>
                        } */}
                        <button 
                            className="btn" 
                            id="btn-info"
                            type="submit" 
                        >
                            Guardar
                        </button>
                    </form>
                )
            })
        } 
        
        </div>
        </div>
)
}
