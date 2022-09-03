import React, { useEffect, useState } from 'react';
import Axios from 'axios';

import { url } from '../../constans';

export const CreateScreen = () => {

    const [competitionList, setCompetitionList] = useState([]);
    const [wodsList, setWodsList] = useState([]);
    const [wodName, setWodName] = useState("");
    const [wodDate, setWodDate] = useState("");
    const [wodBody, setWodBody] = useState("");
    const [selects, setSelects] = useState("");

    useEffect(() => {
      const getCompetitions = async () => {
              const {data:res} = await Axios.get(`${url}competitions`);
                  setCompetitionList(res)
          };
          getCompetitions()
    }, [])

    useEffect(() => {
      const getWods = async (selects) => {
          const {data:res} = await Axios.get(`${url}wods/${selects}`, 
          {
            selects: selects
          });
            setWodsList(res);
            };
            getWods(selects);
      }, [selects]);

    const addWod = () => 
    {
      Axios.post(`${url}wods/table/wods`, {
        tableName: selects,
        wodName: wodName,
        wodDate: wodDate,
        wodBody: wodBody
      }).then(() => {
          setCompetitionList([...competitionList, {
            name: selects,
            wodName: wodName,
            wodDate: wodDate,
            wodBody: wodBody
          }])
      })

        Axios.post(`${url}wods`, 
        {
          tableName: selects,
          wodDate: wodDate,
        }).then(() => {
            setCompetitionList([...competitionList, {
              name: selects,
              wodDate: wodDate,
            }])
        })
    }

    const deleteWod = (wodDate) => {
      Axios.delete(`${url}dropWod/${selects}/${wodDate}`).then((response) => {
        setWodsList(wodsList.filter((val) => {
          return val.wodDate !== wodDate
          }));
      });

      Axios.post(`${url}/competitions/wods`, 
      {
        tableName: selects,
        wodDate: wodDate,
      }).then(() => {
          setCompetitionList([...competitionList, {
            name: selects,
          }])
      })

    }

      console.log(selects)

    return (
      <div className="data-card">
        <div 
          className="textbox"
        >
          <select 
              className="textcombo"
              onChange={e => setSelects(e.target.value)}
          >
            <option>Seleccione Liga</option>
          {
              competitionList.map((val, key) => {
                  return (
                      <option
                      key={key}
                      value={val.nombreComp}
                      >{val.nombreComp}</option>
                  )
              })
          }
          </select>
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
                        required
                        onChange={(event) => {
                          setWodName(event.target.value);
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
                      required
                      onChange={(event) => {
                        setWodDate(event.target.value);
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
                        required
                        onChange={(event) => {
                          setWodBody(event.target.value);
                        }}/>
                  </div>
                </td>
                <td><button className="btn" onClick={()=>{addWod()}}>Nuevo</button></td>
              </tr>
              {
                wodsList.map((val, key) => {
                  return (
                    <tr key={key}>
                        <td>{val.name}</td>
                        <td>{val.date}</td>
                        <td>{val.wod}</td>
                        <td><button className="btn" onClick={()=>{deleteWod(val.date)}}>Eliminar</button></td>
                    </tr>
                  )
                })
              }  
            </tbody>
          </table>
        </div>
    )
}
