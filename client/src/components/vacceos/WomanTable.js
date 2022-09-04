import React, { useEffect } from "react";
import { useState } from "react";
import Axios from "axios";

import { url } from "../../constans";
import { consultaVacia } from "../../constans";

export const WomanTable = () => {
  const [athleteList, setAthleteList] = useState([]);
  const [competitionList, setCompetitionList] = useState([]);
  const [wodsDateList, setWodsDateList] = useState([]);
  const [date, setDate] = useState([]);
  const [selects, setSelects] = useState([]);

  useEffect(() => {
    const getAthletes = async (selects) => {
      const { data: res } = await Axios.get(
        `${url}atheletes/female/${selects}`,
        {
          competition: selects,
          date: date,
        }
      );
      setAthleteList(res);
    };
    getAthletes(selects);
  }, [selects, date]);

  useEffect(() => {
    const getCompetitions = async () => {
      const { data: res } = await Axios.get(`${url}competitions`);
      setCompetitionList(res);
    };
    getCompetitions();
  }, []);

  useEffect(() => {
    if (date === "" || selects === "") {
      console.log(consultaVacia);
    } else {
      const getWodsDate = async (date) => {
        const { data: res } = await Axios.get(
          `${url}competitions/wods/${selects}`,
          {
            selects: selects,
            date: date,
          }
        );
        setWodsDateList(res);
      };
      getWodsDate(date);
    }
  }, [selects, date]);

  return (
    <div className="data-card">
      <div>
        <h1>Clas. Femenina</h1>
        <hr />
      </div>
      <div className="textbox">
        <select
          className="textcombo"
          name="competition"
          onChange={(e) => setSelects(e.target.value)}
        >
          <option>Selecciona liga</option>
          {competitionList.map((val, key) => {
            return (
              <option onChange={(event) => {}} key={key}>
                {val.nombreComp}
              </option>
            );
          })}
        </select>
      </div>
      <div className="textbox">
        <select className="textcombo" onChange={(e) => setDate(e.target.value)}>
          <option>Selecciona WOD</option>
          {wodsDateList.map((val, key) => {
            return (
              <option
                key={key}
                // value={val.fecha}
              >
                {val.fecha}
              </option>
            );
          })}
        </select>
      </div>
      <table>
        <thead className="header">
          <tr>
            <th>Posición</th>
            <th></th>
            <th>Nombre</th>
            <th>Nick</th>
            <th>Puntuación</th>
          </tr>
        </thead>
        <tbody>
          {athleteList.map((val, key) => {
            return (
              <tr key={key}>
                <td>{val.position}</td>
                <td></td>
                {/* <td>{val.photo}</td> */}
                <td>{val.name}</td>
                <td>{val.nickname}</td>
                <td>{val.last}</td>
                <td>{val.best}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
