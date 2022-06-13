import React from 'react';
import { useState } from "react";
import Axios from 'axios';

export const CreateScreen = () => {

    const [competitionList, setCompetitionList] = useState([]);
    const [wodsList, setWodsList] = useState([]);
    const [compName, setCompName] = useState("");


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
    const addWod = (name, wodName) => {
      Axios.post(`http://localhost:3001/createWod/${name}/${wodName}`, {
        name: name,
        wodName: wodName
        }).then(() => {
          setCompetitionList([...competitionList, {
            name: name,
        }])
    })
  }
    

    getCompetitions();

    return (
        <table>
          <thead className="header">
          <div className="textbox">
                <input type="text"/>
                <select 
                    className="textcombo"
                    name="competition"
                >
                {
                    competitionList.map((val, key) => {
                        return (
                            <option
                            onChange={(event) => {
                              setCompName(event.target.value);
                            }}
                            >{val.name}</option>
                        )
                    })
                }
                </select>
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
                        placeholder="Nombre del wod"
                        name="name"
                        autoComplete="off"
                        />
                </div>
              </td>
              <td>
              <div className="textbox">
                    <textarea 
                        type="text" 
                        placeholder="WOD"
                        name="wod"
                        autoComplete="off"
                        />
                </div>
              </td>
              <td><button onClick={()=>{addWod()}}>Nuevo</button></td>
            </tr>
            {
              wodsList.map((val, key) => {
                return (
                  <tr>
                      <td>{val.name}</td>
                      {/* <td><button onClick={()=>{deleteCompetition(val.name)}}>Eliminar</button></td> */}
                  </tr>
                )
              })
            }  
          </tbody>
        </table>
    )
}
