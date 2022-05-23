import React from 'react';
import { useState } from "react";
import Axios from 'axios';

export const CreateScreen = () => {

    const [competitionList, setCompetitionList] = useState([]);
    const [wodsList, setWodsList] = useState([]);

    const getCompetitions = () => {
        Axios.get('http://localhost:3001/competiciones').then((response) => {
          setCompetitionList(response.data)
          })
    }

    const getWods = (name) => {
        Axios.get(`https://localhost:3001/wods/${name}`).then((response) => {
            setWodsList(wodsList.filter((val) => {
                return val.name !== name;
            }))
        })
    }

    getCompetitions();

    return (
        <table>
          <thead className="header">
          <div className="textbox">
            {
              competitionList.map((val, key) => {
                return (
                    <button onClick={()=>{getWods(val.name)}}>{val.name}</button>
                )
              })
            } 
            </div> 
              <tr>
                  <th>Nombre del wod</th>
                  <th>WOD</th>
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
                        />
                </div>
              </td>
              <td>
                <div className="textbox">
                  <input 
                    type="date" 
                    min="" 
                    max="" 
                    name="date"
                    />
                </div>
              </td>
              {/* <td><button onClick={()=>{addCompetition()}}>Nueva</button></td> */}
            </tr>
            {
              competitionList.map((val, key) => {
                return (
                  <tr>
                      <td>{val.name}</td>
                      {/* <button>{val.date}</button> */}
                      {/* <td><button onClick={()=>{deleteCompetition(val.name)}}>Eliminar</button></td> */}
                  </tr>
                )
              })
            }  
          </tbody>
        </table>
    )
}
