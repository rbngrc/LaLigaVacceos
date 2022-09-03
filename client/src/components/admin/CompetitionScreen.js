import React, { useEffect } from 'react';
import { useState } from "react";
import Axios from 'axios';

import { url } from '../../constans';

export const CompetitionScreen = () => {

  const [competitionList, setCompetitionList] = useState([]);
  const [name, setName] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    const getCompetitions = async () => {
            const {data:res} = await Axios.get(`${url}competitions`);
                setCompetitionList(res)
        };
        getCompetitions()
  }, [])

  const deleteCompetition = async (nombreComp) => {
      await Axios.delete(`${url}competitions/${nombreComp}`).then((response) => {
        setCompetitionList(competitionList.filter((val) => {
          return val.nombreComp !== nombreComp
          }));
      });
  }

  useEffect(() => {}, [])
  const addCompetition = async () => {
    await Axios.post(`${url}competitions`, {
      name: name,
      date: date
    }).then(() => {
        setCompetitionList([...competitionList, {
          name: name,
          date: date
        }])
    })
  };

  return (
    <div className="data-card">
      <table>
        <thead className="header">
            <tr>
                <th>Nombre</th>
                <th>Fecha</th>
                <th>Accion</th>
            </tr>
        </thead>
        <tbody>
        <tr>
            <td>
              <div className="textbox">
                  <input 
                      type="text" 
                      placeholder="Nombre de la competición"
                      name="name"
                      autoComplete="off"
                      onChange={(event) => {
                        setName(event.target.value);
                      }}/>
              </div>
            </td>
            <td>
              <div className="textbox">
                <input 
                  type="date" 
                  min="" 
                  max="" 
                  name="date"
                  onChange={(event) => {
                    setDate(event.target.value);
                  }}/>
              </div>
            </td>
            <td><button className="btn" onClick={()=>{addCompetition()}}>Nueva</button></td>
          </tr>
          {
            competitionList.map((val, key) => {
              return (
                <tr key={key}>
                    <td>{val.nombreComp}</td>
                    <td>{val.fecha}</td>
                    <td><button className="btn" onClick={()=>{deleteCompetition(val.nombreComp)}}>Eliminar</button></td>
                </tr>
              )
            })
          }  
        </tbody>
      </table>
    </div>
  )
}
