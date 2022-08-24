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
    const [nickname, setNickname] = useState("");
    const [nameAthlete, setNameAthlete] = useState("");
    // const [selects, setSelects] = useState("");

    useEffect(() => {
        const getAthletes = async (name) => {
            const {data:res} = await Axios.get(url + `atletas/${name}`);
                setAthlete(res);
              };
              getAthletes();
    }, []);

    // console.log(name)
    athlete.map((val, key) => {
        return (
            console.log(val.name)
        )
    })

    useEffect(() => {
        const getCompetitions = async () => {
                const {data:res} = await Axios.get(url + 'competiciones');
                    setCompetitionList(res)
            };
            getCompetitions()
    }, [])

    const addAthleteCometition = () => {
        console.log(selects + " " + name + " " + nickname)
        alert("Registrado en: " + selects)
        Axios.post(url + `addAthlete/${selects}/${name}/${nickname}`, {
          tableName: selects,
          name: name,
          nickname: nickname
          }).then(() => {
            setCompetitionList([...competitionList, {
                tableName: selects,
                name: name,
                nickname: nickname
            }])
          })
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

        const getValue = () => {
            athlete.map((val, key) => {
                return (
                    val.nickname
                )
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
        athlete.map((val, key) => {
        return (
            console.log(val.name)
        )
    })
}
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
                    value={nameAthlete}
                    onChange={(event) => {
                        setNameAthlete(event.target.value);
                    }}
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
                    value={nickname}
                    onChange={(event) => {
                        setNickname(event.target.value);
                    }}
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
                    onChange={(event) => {
                        // setNickname(event.target.value);
                    }}
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
                    onChange={(event) => {
                        // setWodName(event.target.value);
                    }}
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
                <option></option>
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