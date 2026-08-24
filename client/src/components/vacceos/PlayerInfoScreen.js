import React, { useState } from 'react';

import '../../styles/insertData.css';

import { mockCompetitions, mockAllAthletes } from '../../mocks/data';

export const PlayerInfoScreen = () => {

    const [competitionList] = useState(mockCompetitions);
    const [athletes] = useState(mockAllAthletes.slice(0, 1));

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
                        return (
                            <option key={val.name}>{val.name}</option>
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
