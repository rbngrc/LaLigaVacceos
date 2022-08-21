import React, { useEffect, useState } from 'react';
import Axios from 'axios';

import { url } from '../../constans';

export const CreateScreen = () => {

    const [competitionList, setCompetitionList] = useState([]);
    const [wodsList, setWodsList] = useState([]);
    const [compName, setCompName] = useState([]);

    useEffect(() => {
      const getCompetitions = async () => {
              const {data:res} = await Axios.get(url + 'competiciones');
                  setCompetitionList(res)
          };
          getCompetitions()
    }, [])

    // useEffect(() => {
    //   const getWods = async (name) => {
    //       const {data:res} = await Axios.get(url + `wods/${name}`);
    //         setWodsList(res);
    //         };
    //         getWods(compName);
    //   }, [compName]);

    // const  = (name) => {
    //     Axios.get(url + 'wods/' + name).then((response) => {
    //         (wodsList.filter((val) => {
    //             return val.name !== name;
    //         }))
    //     })
    // }

    const addWod = (name, wodDate, wodBody) => {
      Axios.post(url + `createWod/${name}/${wodDate}/${wodBody}`, {
        name: name,
        wodDate: wodDate,
        wodBody: wodBody
        }).then(() => {
          setCompetitionList([...competitionList, {
            name: name,
          }])
        })
    }

    const getOption = () => {
      // console.log(e)
      const name = document.getElementById('competitionName').innerHTML
      console.log(name)
    }

    return (
      <div className="data-card">
        <div 
          className="textbox"
          // onSubmit={getOption}
        >
          <select 
              className="textcombo"
              // id="competitionName"
              onChange={getOption}
          >
          {
              competitionList.map((val, key) => {
                  return (
                      <option
                      id='competitionName'
                      key={val.name}
                      value={val.name}
                      >{val.name}</option>
                  )
              })
          }
          </select>
          {/* <button className="btn" type='submit'>Mostrar</button> */}
        </div> 
          <table>
            <thead className="header">
                <tr>
                    <th>Nombre del wod</th>
                    <th>Fecha del wod</th>
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
                    <input 
                      type="date" 
                      min="" 
                      max="" 
                      name="date"
                      onChange={(event) => {
                        // setDate(event.target.value);
                      }}/>
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
