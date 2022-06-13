import React from 'react';
import { useState } from "react";
import Axios from 'axios';

export const CompetitionScreen = () => {

  const [competitionList, setCompetitionList] = useState([]);
  const [name, setName] = useState("");
  const [date, setDate] = useState("");

  const addCompetition = () => {
    Axios.post('http://localhost:3001/createCompetition', {
        name: name,
        date: date,
    }).then(() => {
        setCompetitionList([...competitionList, {
          name: name,
          date: date,
        }])
    })

    Axios.post(`http://localhost:3001/createCompetition/${name}`, {
        name: name,
    }).then(() => {
        setCompetitionList([...competitionList, {
          name: name,
        }])
    })
  };

    

  const getCompetitions = () => {
      Axios.get('http://localhost:3001/competiciones').then((response) => {
        setCompetitionList(response.data)
        })
  }

  const deleteCompetition = (name) => {
      Axios.delete(`http://localhost:3001/deleteCompetition/${name}`).then((response) => {
        setCompetitionList(competitionList.filter((val) => {
          return val.name !== name
          }));
      });

      Axios.delete(`http://localhost:3001/dropTable/${name}`).then((response) => {
        setCompetitionList(competitionList.filter((val) => {
          return val.name !== name
          }));
      });
  }

  getCompetitions();

  return (
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
            <td><button onClick={()=>{addCompetition()}}>Nueva</button></td>
          </tr>
          {
            competitionList.map((val, key) => {
              return (
                <tr>
                    <td>{val.name}</td>
                    <td>{val.date}</td>
                    <td><button onClick={()=>{deleteCompetition(val.name)}}>Eliminar</button></td>
                </tr>
              )
            })
          }  
        </tbody>
      </table>
  )
}
