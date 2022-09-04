import React, { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
// import { useForm } from "../../hooks/useForms";
import Axios from "axios";

import { url } from "../../constans";

import "../../styles/insertData.css";

export const PlayerInfoScreen = () => {
  const { name } = useSelector((state) => state.auth);
  const [competitionList, setCompetitionList] = useState([]);
  const [athletes, setAthletes] = useState([]);
  const [selects, setSelects] = useState("");
  const [nickAthlete, setNickAthlete] = useState("");
  const [email, setEmail] = useState("");
  const [nameAtl, setNameAtl] = useState("");
  const [passAthlete, setPassAthlete] = useState("");
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

  //   nameAtl, nickAthlete, passAthlete, selectsSex, email

  const handleData = (e) => {
    e.preventDefault();

    console.log(
      "Nombre: " + nameAtl,
      "Nick: " + nickAthlete,
      "Pass: " + passAthlete,
      "Sex: " + selectsSex,
      "Email: " + email
    );
  };

  console.log("CLG: " + nameAtl)

  const addAthleteCometition = (nicknameAthlete, selectsSex) => {
    alert("Registrado en: " + selects);
    Axios.post(`${url}atheletes/competition`, {
      nombreComp: selects,
      name: name,
      nickname: nickAthlete,
      sex: selectsSex,
      email: email,
    }).then(() => {
      setCompetitionList([
        ...competitionList,
        {
          tableName: selects,
          name: name,
          nickname: nicknameAthlete,
          sex: selectsSex,
          email: email,
        },
      ]);
    });
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
            <form className="info-box" key={key} onSubmit={handleData}>
              <label>Nombre</label>
              <div className="textbox">
                <input
                  type="text"
                  placeholder={val.nombre}
                  name="name"
                  autoComplete="off"
                  required
                  defaultValue={val.nombre}
                  onClick={() => {
                    setNameAtl(val.nombre);
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
                  defaultValue={val.nick}
                  onChange={(event) => {
                    setNickAthlete(event.target.value);
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
                  defaultValue={val.pass}
                  onChange={(event) => {
                    setPassAthlete(event.target.value);
                  }}
                />
              </div>
              <label>Correo</label>
              <div className="textbox">
                <input
                  type="text"
                  placeholder={val.nick}
                  name="nickname"
                  autoComplete="off"
                  readOnly
                  defaultValue={val.email}
                  onChange={(event) => {
                    setEmail(event.target.value);
                  }}
                />
              </div>
              <label>Sexo</label>
              <div className="textbox">
                <input
                  type="text"
                  placeholder={val.nick}
                  name="nickname"
                  autoComplete="off"
                  readOnly
                  defaultValue={"Actual: " + val.sex}
                />
                <select
                  className="textcombo"
                  onChange={(e) => setSelectsSex(e.target.value)}
                >
                  <option>Seleccione sexo si desea cambiar</option>
                  <option>Femenino</option>
                  <option>Masculino</option>
                </select>
              </div>
              <button className="btn" id="btnMarca" type="submit">
                Actualizar datos
              </button>
            </form>
          );
        })}
        <form className="info-box" onSubmit={addAthleteCometition}>
          <div className="textbox">
            <label>Seleccione competición</label>
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
          <button className="btn" id="btnComp" type="submit">
            Entrar a competir
          </button>
        </form>
      </div>
    </div>
  );
};
