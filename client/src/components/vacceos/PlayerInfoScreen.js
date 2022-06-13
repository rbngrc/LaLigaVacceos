import React from 'react';
import { useState } from "react";
import { useSelector } from 'react-redux';
import Axios from 'axios';

import '../../styles/insertData.css';

export const PlayerInfoScreen = () => {

    const { name } = useSelector(state => state.auth);
    const [competitionList, setCompetitionList] = useState([]);
    // const [competitionName, setName] = useState("");

    const getAthletes = (name) => {
        Axios.get('http://localhost:3001/atletas/:name').then((response) => {
          setCompetitionList(response.data)
          })
    }

    const getCompetitions = () => {
        Axios.get('http://localhost:3001/competiciones').then((response) => {
          setCompetitionList(response.data)
          })
    }

    getCompetitions();
    // getAthletes(name);

  return (
    <div className="data-card">
        <div className="wod-title">
            <h1>Datos personales</h1>
            <hr/>
        </div>
        <div>
        <form 
            className="info-box"
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
                    <option>Femenina</option>
                    <option>Masculina</option>
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
                            <option>{val.name}</option>
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
        </div>
        </div>
)
}
