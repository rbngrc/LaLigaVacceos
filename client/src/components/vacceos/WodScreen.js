import React, { useEffect, useState } from "react";
import Axios from "axios";

import "../../styles/wodScreen.css";

import { url } from "../../constans";

export const WodScreen = () => {
  const [competitionList, setCompetitionList] = useState([]);
  const [wodsList, setWodsList] = useState([]);
  const [wodsDateList, setWodsDateList] = useState([]);
  const [selects, setSelects] = useState([]);
  const [date, setDate] = useState([]);

  useEffect(() => {
    const getWods = async (selects) => {
      const { data: res } = await Axios.get(url + `wods/${selects}`, {
        selects: selects,
      });
      setWodsList(res);
    };
    getWods(selects);
  }, [selects]);

  useEffect(() => {
    const getCompetitions = async () => {
      const { data: res } = await Axios.get(url + "competiciones");
      setCompetitionList(res);
    };
    getCompetitions();
  }, []);

  useEffect(() => {
    const getWodsDate = async (date) => {
      const { data: res } = await Axios.get(
        url + `wodsDate/${selects}/${date}`,
        {
          selects: selects,
          date: date,
        }
      );
      setWodsDateList(res);
    };
    getWodsDate(date);
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
                <option key={key} value={val.name}>
                  {val.name}
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
            {wodsList.map((val, key) => {
              return (
                <option key={key} value={val.date}>
                  {val.date}
                </option>
              );
            })}
          </select>
        </div>
        {wodsDateList.map((val, key) => {
          return (
            <div key={key}>
              <div className="wod-title">
                <h1>{val.date}</h1>
                <hr />
              </div>
              <div className="wod-title">
                <h3>{val.name}</h3>
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
