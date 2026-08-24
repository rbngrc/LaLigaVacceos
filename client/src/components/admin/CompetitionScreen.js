import React, { useState } from 'react';

import { mockCompetitions } from '../../mocks/data';

export const CompetitionScreen = () => {

  const [competitionList, setCompetitionList] = useState(mockCompetitions);
  const [name, setName] = useState("");
  const [date, setDate] = useState("");

  const addCompetition = () => {
    if (!name || !date) return;

    setCompetitionList([...competitionList, { name, date }]);
    setName("");
    setDate("");
  };

  const deleteCompetition = (name) => {
    setCompetitionList(competitionList.filter((val) => val.name !== name));
  }

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
                      value={name}
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
                  value={date}
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
  )
}
