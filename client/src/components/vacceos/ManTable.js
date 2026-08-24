import React, { useState } from 'react';

import { mockMaleAthletes, mockCompetitions } from '../../mocks/data';

export const ManTable = () => {

  const [athleteList] = useState(mockMaleAthletes);
  const [competitionList] = useState(mockCompetitions);

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
