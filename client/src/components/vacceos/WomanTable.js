import React, { useEffect } from 'react';
import { useState } from "react";
import Axios from 'axios';

export const WomanTable = () => {

  const url = "http://localhost:3001/"

  const [athleteList, setAthleteList] = useState([]);
  const [competitionList, setCompetitionList] = useState([]);

  // const getAthletes = () => {
  //   Axios.get(url + 'atletasFemeninos').then((response) => {
  //     setAthleteList(response.data)
  //     })
  // }

  useEffect(() => {
    const getAthletes = async (name) => {
        const {data:res} = await Axios.get(url + 'atletasFemeninos');
          setAthleteList(res);
          };
          getAthletes();
    }, []);

  const getCompetitions = () => {
    Axios.get(url + 'competiciones').then((response) => {
      setCompetitionList(response.data)
      })
}

  getCompetitions();
  // getAthletes();

  return (
    <table>
      <select 
            className="textcombo"
            name="competition"
        >
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
      <thead className="header">
          <tr>
              <th>Posición</th>
              <th></th>
              <th>Nombre</th>
              <th>Puntuación</th>
              <th>Mejor Puesto</th>
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
  )
}
