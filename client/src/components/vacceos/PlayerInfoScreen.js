import React, { useEffect } from 'react';
import { useState } from "react";
import { useForm } from '../../hooks/useForms';
import { useDispatch, useSelector } from 'react-redux';
// import { useForm } from '../../hooks/useForms';
import Axios from 'axios';

import { url } from '../../constans';

import '../../styles/insertData.css';

// import { removeError, setError } from '../../actions/ui';

export const PlayerInfoScreen = () => {

    const { name } = useSelector(state => state.auth);
    const [competitionList, setCompetitionList] = useState([]);
    const [athlete, setAthlete] = useState([]);
    const [selects, setSelects] = useState("");
    const [nicknameAthlete, setNicknameAthlete] = useState("");
    const [nameAthlete, setNameAthlete] = useState("");
    const [selectsSex, setSelectsSex] = useState("");
    // const [selects, setSelects] = useState("");

    useEffect(() => {
        const getAthletes = async (name) => {
            const {data:res} = await Axios.get(url + `atletas/${name}`);
                setAthlete(res);
              };
              getAthletes(name);
    }, []);

    useEffect(() => {
        const getCompetitions = async () => {
                const {data:res} = await Axios.get(url + 'competiciones');
                    setCompetitionList(res)
            };
            getCompetitions()
    }, [])

    const addAthleteCometition = (nicknameAthlete, selectsSex) => {
        alert("Registrado en: " + selects)
        Axios.post(url + `addAthlete/${selects}/${name}/${nicknameAthlete}/${selectsSex}`, {
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
          console.log(url + `addAthlete/${selects}/${name}/${nicknameAthlete}/${selectsSex}`)
      }

        const updateDatos = () => {
            // Axios.put(url + 'create', {
            //     email: email,
            //     name: name,
            //     nickname: nickname,
            //     password: password,
            //     sex: sex,
            //     competition: competition
            // }).then(() => {
            //     setAthlete([...athlete, {
            //         email: email,
            //         name: name,
            //         nickname: nickname,
            //         password: password,
            //         sex: sex,
            //         competition: competition
            //     }])
            // })

            console.log("UPDATING")
        };

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
            athlete.map((val, key) => {
              return (
                <input 
                    key={val.name}
                    type="text" 
                    placeholder="Nombre" 
                    name="name" 
                    autoComplete="off"
                    required
                    value={val.name}
                    onChange={(event) => {
                        setNameAthlete(event.target.value);
                    }}
                />
              )
            })
          }  
                {/* <input 
                    type="text" 
                    placeholder="Nombre" 
                    name="name" 
                    autoComplete="off"
                    required
                    value={nameAthlete}
                    onChange={(event) => {
                        setNameAthlete(event.target.value);
                    }}
                /> */}
                
            </div> 
            <div className="textbox">
                <label>Apodo</label>
                {
                    athlete.map((val, key) => {
                    return (
                        <input 
                            type="text" 
                            placeholder="Apodo" 
                            name="nickname" 
                            autoComplete="off"
                            required
                            value={val.nickname}
                            onChange={(event) => {
                                setNicknameAthlete(event.target.value);
                            }}
                        />
                    )
                    })
                } 
                {/* <input 
                    type="text" 
                    placeholder="Apodo" 
                    name="nickname" 
                    autoComplete="off"
                    required
                    value={nickname}
                    onChange={(event) => {
                        setNickname(event.target.value);
                    }}
                /> */}
            </div>
            <div className="textbox">
                <label>Contraseña</label>
                {
                    athlete.map((val, key) => {
                    return (
                        <input 
                            type="password" 
                            placeholder="Contraseña" 
                            name="password" 
                            autoComplete="off"
                            required
                            value={val.password}
                            onChange={(event) => {
                                // setPasswordAthlete(event.target.value);
                            }}
                        />
                    )
                    })
                } 
                {/* <input 
                    type="password" 
                    placeholder="Contraseña" 
                    name="password" 
                    autoComplete="off"
                    required
                    onChange={(event) => {
                        // setNickname(event.target.value);
                    }}
                /> */}
            </div>
            <div className="textbox">
                <input type="text"/>
                <label>Seleccione su sexo</label>
                <select 
                className="textcombo"
                onChange={e => setSelectsSex(e.target.value)}
            >
            {
                athlete.map((val, key) => {
                    return (
                        <option
                        key={val.sex}
                        value={val.sex}
                        >Actual: {val.sex}</option>
                    )
                })
            }
                    <option>Femenino</option>
                    <option>Masculino</option>
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
                onClick={()=>{updateDatos()}}
            >
                Actualizar datos
            </button>
        </form>
        <div 
            className="info-box"
        >
            <div 
            className="textbox"
            >
            <select 
                className="textcombo"
                onChange={e => setSelects(e.target.value)}
            >
                <option>Selecciona liga</option>
            {
                competitionList.map((val, key) => {
                    return (
                        <option
                        key={val.name}
                        value={val.name}
                        >{val.name}</option>
                    )
                })
            }
            </select>
            </div> 
            <button 
                className="btn" 
                id="btnMarca"
                onClick={()=>{addAthleteCometition()}}
            >
                Entrar a competir
            </button>
        </div>
        </div>
        </div>
)
}