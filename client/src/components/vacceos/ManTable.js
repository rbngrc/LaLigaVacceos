import React, { useEffect } from 'react';
import { useState } from "react";
import Axios from 'axios';

import { url } from '../../constans';

export const ManTable = () => {

  const [athleteList, setAthleteList] = useState([]);
  const [competitionList, setCompetitionList] = useState([]);
  const [selects, setSelects] = useState([]);

  useEffect(() => {
    const getAthletes = async (name) => {
        const {data:res} = await Axios.get(url + 'atletasMasculinos');
          setAthleteList(res);
          };
          getAthletes();
    }, []);

    useEffect(() => {
      const getCompetitions = async () => {
              const {data:res} = await Axios.get(url + 'competiciones');
                  setCompetitionList(res)
          };
          getCompetitions()
    }, [])

    console.log(selects)

    return (
      <div className="data-card">
        <div className="textbox">
          <select 
              className="textcombo"
              name="competition"
              onChange={e => setSelects(e.target.value)}
          >
            <option></option>
          {
              competitionList.map((val, key) => {
                  return (
                      <option
                      onChange={(event) => {
                        // setCompName(event.target.value);
                      }}
                      key={val.name}
                      >{val.name}</option>
                  )
              })
          }
          </select>
        </div> 
        <table>
          <thead className="header">
              <tr>
                  <th>Posición</th>
                  <th></th>
                  <th>Nombre</th>
                  <th>Puntuación</th>
              </tr>
          </thead>
          <tbody>
            {
              athleteList.map((val, key) => {
                return (
                  <tr key={val.name}>
                      <td>{val.position}</td>
                      {/* <td>{val.photo}</td> */}
                      <td>{val.name}<br/><span className="nickname">{val.nickname}</span></td>
                      <td>{val.last}</td>
                      <td>{val.best}</td>
                  </tr>
                )
              })
            }  
          </tbody>
        </table>
      </div>
    )
}
