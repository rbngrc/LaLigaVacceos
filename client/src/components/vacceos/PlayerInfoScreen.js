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
    // const [competitionName, setName] = useState("");

    // const getAthletes = (name) => {
    //     Axios.get(url + 'atletas/'+ name).then((response) => {
    //         setAthlete(response.data);
    //       })
    //       .catch((error) => console.log("Error"))
    // }

    useEffect(() => {
        const getAthletes = async (name) => {
            const {data:res} = await Axios.get(url + 'atletas/' + name);
                setAthlete(res);
              };
              getAthletes(name);
        }, []);

    const getCompetitions = () => {
        Axios.get(url + 'competiciones').then((response) => {
          setCompetitionList(response.data)
          })
    }

    getCompetitions();

    const updateDatos = (e) => {
        e.preventDefault();
        console.log("Datos guardados")
    }

    

  return (
    <div className="data-card">
        <div className="wod-title">
            <h1>Datos personales</h1>
            <hr/>
        </div>
        <div>
        {
            athletes.map(athlete => {
                // TODO console.log(athlete.name + " form") OJO BUCLE 
                return(
                    <table key={athlete.email}>
                        <thead className="header">
                            <tr>

                            </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>
                            <label>Nombre</label>
                            <div className="textbox">
                                <input 
                                    type="text" 
                                    placeholder={athlete.name} 
                                    name="name" 
                                    autoComplete="off"
                                    required
                                    value={athlete.name}
                                />
                            </div>
                            </td>
                            <td><button className="btn" onClick={()=>{}}>Modificar</button></td>
                        </tr>
                        <tr>
                            <td>
                            <label>Email</label>
                            <div className="textbox">
                                <input 
                                    type="text" 
                                    placeholder={athlete.email}
                                    name="email" 
                                    autoComplete="off"
                                    required
                                    value={athlete.email}
                                />
                            </div>
                            </td>
                            <td><button className="btn" onClick={()=>{}}>Modificar</button></td>
                        </tr>
                        <tr>
                            <td>
                            <label>Apodo</label>
                            <div className="textbox">
                                <input 
                                    type="text" 
                                    placeholder={athlete.nickname}
                                    name="nickname" 
                                    autoComplete="off"
                                    required
                                    value={athlete.nickname}
                                />
                            </div>
                            </td>
                            <td><button className="btn" onClick={()=>{}}>Modificar</button></td>
                        </tr>
                        <tr>
                            <td>
                            <label>Contraseña</label>
                            <div className="textbox">
                                <input 
                                    type="password" 
                                    placeholder="Contraseña"
                                    name="password" 
                                    autoComplete="off"
                                    required
                                    value={athlete.password}
                                />
                            </div>
                            </td>
                            <td><button className="btn" onClick={()=>{}}>Modificar</button></td>
                        </tr>
                        <tr>
                            <td>
                            <label>Sexo</label>
                            <div className="textbox">
                                <input type="text"/>
                                <select 
                                    className="textcombo"
                                    name="sex"
                                >
                                    <option>Actual: {athlete.sex}</option>
                                    <option>Femenino</option>
                                    <option>Masculino</option>
                                </select>
                            </div>
                            </td>
                            <td><button className="btn" onClick={()=>{}}>Modificar</button></td>
                        </tr>
                        <tr>
                            <td>
                            <label>Seleccione competición</label>
                            <div className="textbox">
                            <input type="text"/>
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
                            </td>
                            <td><button className="btn" onClick={()=>{}}>Añadir</button></td>
                        </tr>
                        </tbody>
                    </table>
                )
            })
        } 
        </div>
    </div>
)
}
