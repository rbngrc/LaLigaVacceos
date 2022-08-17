import React, { Fragment, useEffect } from 'react';
import { useState } from "react";
import Axios from 'axios';

import { url } from '../../constans';

export const CreateScreen = () => {

    const [competitionList, setCompetitionList] = useState([]);
    const [wodsList, setWodsList] = useState([]);
    const [compName, setCompName] = useState("");

    useEffect(() => {
      const getCompetitions = async () => {
              const {data:res} = await Axios.get(url + 'competiciones');
                  setCompetitionList(res)
          };
          getCompetitions()
    }, [])

    useEffect(() => {
      const getWods = async (name) => {
          const {data:res} = await Axios.get(url + 'wods/' + name);
            setWodsList(res);
            };
            getWods(compName);
      }, [compName]);

    // const  = (name) => {
    //     Axios.get(url + 'wods/' + name).then((response) => {
    //         (wodsList.filter((val) => {
    //             return val.name !== name;
    //         }))
    //     })
    // }

    const addWod = (name, wodName) => {
      Axios.post(url + `createWod/${name}/${wodName}`, {
        name: name,
        wodName: wodName
        }).then(() => {
          setCompetitionList([...competitionList, {
            name: name,
        }])
    })
  }

    return (
      <div className="data-card">
        <div className="textbox">
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
                    <th>Nombre del wod</th>
                    <th>WOD</th>
                    <th>Accion</th>
                </tr>
            </thead>
            <tbody>
            <tr>
                <td>
                  <input 
                      type="text" 
                      placeholder="Nombre del wod"
                      name="name"
                      autoComplete="off"
                  />
                </td>
                <td>
                  <textarea 
                      type="text" 
                      placeholder="WOD"
                      name="wod"
                      autoComplete="off"
                  />
                </td>
                <td><button className="btn" onClick={()=>{addWod()}}>Nuevo</button></td>
              </tr>
              {
                wodsList.map((val, key) => {
                  return (
                    <tr key={val.name}>
                        <td>{val.name}</td>
                        {/* <td><button onClick={()=>{deleteCompetition(val.name)}}>Eliminar</button></td> */}
                    </tr>
                  )
                })
              }  
            </tbody>
          </table>
        </div>
    )
}
