import React, { useEffect, useState } from "react";
import Axios from "axios";

import "../../styles/wodScreen.css";

import { url } from "../../constans";
import { consultaVacia } from "../../constans";

export const WodScreen = () => {
  const [competitionList, setCompetitionList] = useState([]);
  const [wodsDateList, setWodsDateList] = useState([]);
  const [wodsList, setWodsList] = useState([]);
  const [date, setDate] = useState([]);
  const [selects, setSelects] = useState([]);

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

  useEffect(() => {
    if (date === "" || selects === "") {
      console.log(consultaVacia);
    } else {
      const getWodsDate = async (date) => {
        const { data: res } = await Axios.get(
          `${url}competitions/wods/${selects}/${date}`,
          {
            selects: selects,
            date: date,
          }
        );
        setWodsList(res);
      };
      getWodsDate(date);
    }
  }, [selects, date]);

  return (
    <div>
      <div className="wod-card">
        <div className="textbox">
          <select
            className="textcombo"
            onChange={(e) => setSelects(e.target.value)}
          >
            <option>Selecciona liga</option>
            {competitionList.map((val, key) => {
              return (
                <option id="competitionName" key={key} value={val.nombreComp}>
                  {val.nombreComp}
                </option>
              );
            })}
          </select>
        </div>
        <div className="textbox">
          <select
            className="textcombo"
            onChange={(e) => setDate(e.target.value)}
          >
            <option>Selecciona WOD</option>
            {wodsDateList.map((val, key) => {
              return <option key={key}>{val.fecha}</option>;
            })}
          </select>
        </div>
        {wodsList.map((val, key) => {
          return (
            <div key={key}>
              <div className="wod-title">
                <h1>{val.fecha}</h1>
                <hr />
              </div>
              <div className="wod-title">
                <h3>{val.nombreComp}</h3>
                <hr />
              </div>
              <div className="wod-body">
                <p>{val.wod}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
