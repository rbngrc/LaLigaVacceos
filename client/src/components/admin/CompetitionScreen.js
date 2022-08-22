import React, { useEffect } from 'react';
import { useState } from "react";
import Axios from 'axios';

import { url } from '../../constans';

export const CompetitionScreen = () => {

  const [competitionList, setCompetitionList] = useState([]);
  const [name, setName] = useState("");
  const [date, setDate] = useState("");

  const addCompetition = () => {
    Axios.post(url + 'createCompetition', {
        name: name,
        date: date,
    }).then(() => {
        setCompetitionList([...competitionList, {
          name: name,
          date: date,
        }])
    })

    Axios.post(url + `createCompetition/${name}`, {
        name: name,
    }).then(() => {
        setCompetitionList([...competitionList, {
          name: name,
        }])
    })

    Axios.post(url + `createCompetitionsWods/${name}`, {
      name: name,
      }).then(() => {
          setCompetitionList([...competitionList, {
            name: name,
          }])
      })
  };

  useEffect(() => {
    const getCompetitions = async () => {
            const {data:res} = await Axios.get(url + 'competiciones');
                setCompetitionList(res)
        };
        getCompetitions()
  }, [])

  const deleteCompetition = (name) => {
      Axios.delete(url + `deleteCompetition/${name}`).then((response) => {
        setCompetitionList(competitionList.filter((val) => {
          return val.name !== name
          }));
      });

      Axios.delete(url + `dropTable/${name}`).then((response) => {
        setCompetitionList(competitionList.filter((val) => {
          return val.name !== name
          }));
      });

      Axios.delete(url + `dropTableWods/${name}`).then((response) => {
        setCompetitionList(competitionList.filter((val) => {
          return val.name !== name
          }));
      });
  }

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
                <tr key={val.name}>
                    <td>{val.name}</td>
                    <td>{val.date}</td>
                    <td><button className="btn" onClick={()=>{deleteCompetition(val.name)}}>Eliminar</button></td>
                </tr>
              )
            })
          }  
        </tbody>
      </table>
    </div>
  )
}
