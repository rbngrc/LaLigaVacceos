import React, { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import Axios from "axios";

import { url } from "../../constans";

import "../../styles/insertData.css";

export const PlayerInfoScreen = () => {
  const { name } = useSelector((state) => state.auth);
  const [competitionList, setCompetitionList] = useState([]);
  const [athletes, setAthletes] = useState([]);
  const [selects, setSelects] = useState("");
  const [nickAthlete, setNickAthlete] = useState("");
  // const [nameAtl, setNameAtl] = useState("");
  // const [passAthlete, setPassAthlete] = useState("");
  const [selectsSex, setSelectsSex] = useState("");

  useEffect(() => {
    const getAthletes = async (name) => {
      const { data: res } = await Axios.get(`${url}atheletes/${name}`);
      setAthletes(res);
    };
    getAthletes(name);
  }, [name]);

  useEffect(() => {
    const getCompetitions = async () => {
      const { data: res } = await Axios.get(`${url}competitions`);
      setCompetitionList(res);
    };
    getCompetitions();
  }, []);

  const addAthleteCometition = (nick, sex, email) => {
    if (selects === "" || selects === "Selecciona liga") {
      alert("No ha seleccionado competición");
    } else {
      alert("Registrado en: " + selects);
      Axios.post(`${url}atheletes/competition`, {
        nombreComp: selects,
        name: name,
        nickname: nick,
        sex: sex,
        email: email,
      }).then(() => {
        setCompetitionList([
          ...competitionList,
          {
            tableName: selects,
            name: name,
            nickname: nick,
            sex: sex,
            email: email,
          },
        ]);
      });
    }
  };

  return (
    <div className="data-card">
      <div className="wod-title">
        <h1>Datos personales</h1>
        <hr />
      </div>
      <div>
        {athletes.map((val, key) => {
          return (
            <table key={key}>
              <thead className="header">
                <tr>
                  <th>{val.email}</th>
                  <th></th>
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
                  <td>
                    <button className="btn" onClick={() => {}}>
                      Modificar
                    </button>
                  </td>
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
                  <td>
                    <button
                      className="btn"
                      onClick={() => {
                        setNickAthlete();
                      }}
                    >
                      Modificar
                    </button>
                  </td>
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
                  <td>
                    <button className="btn" onClick={() => {}}>
                      Modificar
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>
                    <label>Sexo</label>
                    <div className="textbox">
                      <p>Actual: {val.sex}</p>
                      <select
                        className="textcombo"
                        onChange={(e) => setSelectsSex(e.target.value)}
                      >
                        <option>Seleccione si desea cambiar</option>
                        <option>Femenino</option>
                        <option>Masculino</option>
                      </select>
                    </div>
                  </td>
                  <td>
                    <button className="btn" onClick={() => {}}>
                      Modificar
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>
                    <label>Seleccione competición</label>
                    <div className="textbox">
                      <input type="text" />
                      <select
                        className="textcombo"
                        onChange={(e) => setSelects(e.target.value)}
                      >
                        <option>Selecciona liga</option>
                        {competitionList.map((val, key) => {
                          return <option key={key}>{val.nombreComp}</option>;
                        })}
                      </select>
                    </div>
                  </td>
                  <td>
                    <button
                      className="btn"
                      onClick={() => {
                        addAthleteCometition(val.nick, val.sex, val.email);
                      }}
                    >
                      Entrar a competir
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          );
        })}
      </div>
    </div>
  );
};
