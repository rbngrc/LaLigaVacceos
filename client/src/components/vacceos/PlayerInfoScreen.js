import React, { useEffect } from 'react';
import { useState } from "react";
import { useSelector } from 'react-redux';
// import { useForm } from '../../hooks/useForms';
import Axios from 'axios';

import { url } from '../../constans';

import '../../styles/insertData.css';

// import { removeError, setError } from '../../actions/ui';

export const PlayerInfoScreen = () => {

    const { name } = useSelector(state => state.auth);
    const [competitionList, setCompetitionList] = useState([]);
    const [athletes, setAthletes] = useState([]);
    const [selects, setSelects] = useState("");
    const [nicknameAthlete, setNicknameAthlete] = useState("");
    // const [nameAthlete, setNameAthlete] = useState("");
    // const [passwordAthlete, setPasswordAthlete] = useState("");
    const [selectsSex, setSelectsSex] = useState("");

    useEffect(() => {
        const getAthletes = async (name) => {
            const {data:res} = await Axios.get(`${url}atheletes/${name}`);
                setAthletes(res);
              };
              getAthletes(name);
    }, [name]);

    useEffect(() => {
        const getCompetitions = async () => {
                const {data:res} = await Axios.get(`${url}competitions`);
                    setCompetitionList(res)
            };
            getCompetitions()
    }, [])

    const addAthleteCometition = (nicknameAthlete, selectsSex) => {
        alert("Registrado en: " + selects)
        Axios.post(`${url}atheletes/competition/${selects}/${name}/${nicknameAthlete}/${selectsSex}`, {
          tableName: selects,
          name: name,
          nickname: nicknameAthlete,
          sex: selectsSex
          }).then(() => {
            setCompetitionList([...competitionList, {
                tableName: selects,
                name: name,
                nickname: nicknameAthlete,
                sex: selectsSex
            }])
          })
      }

        return (
            <div className="data-card">
                <div className="wod-title">
                    <h1>Datos personales</h1>
                    <hr/>
                </div>
                <div>
                {
                    athletes.map((val, key) => {
                        return(
                            <table key={key}>
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
                                            placeholder={val.nombre} 
                                            name="name" 
                                            autoComplete="off"
                                            required
                                            defaultValue={val.nombre}
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
                                            placeholder={val.nick}
                                            name="nickname" 
                                            autoComplete="off"
                                            required
                                            defaultValue={val.nick}
                                        />
                                    </div>
                                    </td>
                                    <td><button className="btn" onClick={()=>{setNicknameAthlete()}}>Modificar</button></td>
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
                                            defaultValue={val.pass}
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
                                        onChange={e => setSelectsSex(e.target.value)}
                                    >
                                            <option>Actual: {val.sex}</option>
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
                                        onChange={e => setSelects(e.target.value)}
                                    >
                                            <option>Selecciona liga</option>
                                        {
                                            competitionList.map((val, key) => {
                                                return (
                                                    <option key={key}>{val.name}</option>
                                                )
                                            })
                                        }
                                        </select>
                                    </div>
                                    </td>
                                    <td><button className="btn" onClick={()=>{addAthleteCometition(nicknameAthlete, selectsSex)}}>Entrar a competir</button></td>
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
