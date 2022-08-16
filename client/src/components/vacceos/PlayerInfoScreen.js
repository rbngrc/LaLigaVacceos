import React, { useEffect } from 'react';
import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from '../../hooks/useForms';
import Axios from 'axios';

import '../../styles/insertData.css';

import { removeError, setError } from '../../actions/ui';

export const PlayerInfoScreen = () => {

    const url = "http://localhost:3001/"

    const { name } = useSelector(state => state.auth);
    const [competitionList, setCompetitionList] = useState([]);
    const [athletes, setAthlete] = useState([]);

    useEffect(() => {
        const getAthletes = async (name) => {
            const {data:res} = await Axios.get(url + 'atletas/' + name);
                setAthlete(res);
              };
              getAthletes();
        }, []);

    useEffect(() => {
        const getCompetitions = async () => {
                const {data:res} = await Axios.get(url + 'competiciones');
                    setCompetitionList(res)
            };
            getCompetitions()
    }, [])

    const updateDatos = () => {
        console.log("Datos guardados ")
    }

    const addComp = () => {
        console.log("Anadida Competicion ")
    }

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
                {
                    athletes.map((val, key) => {
                        return (
                            [val.name]
                        )
                    })
                }
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

            {/* {
            msgError &&
            <div className="alert-error">
                <p>{msgError}</p>
            </div>
            } */}
            <button 
                className="btn" 
                id="btnMarca"
                type="submit" 
            >
                Actualizar datos
            </button>
        </form>
        <form 
            className="info-box"
        >
        <div className="textbox">
                <input type="text"/>
                <label>Seleccione competición</label>

                <select 
                    className="textcombo"
                    name="competition"
                >
                {
                    competitionList.map((val, key) => {
                        console.log(val.name)
                        return (
                            <option>{val.name}</option>
                        )
                    })
                }
                </select>
            </div> 
            <button 
                className="btn" 
                id="btnMarca"
                type="submit" 
            >
                Entrar a competir
            </button>
        </form>
        </div>
        </div>
)
}