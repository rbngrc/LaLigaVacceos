import React from 'react';
import { useState } from "react";

import { mockAllAthletes } from '../../mocks/data';

import '../../styles/table.css';


export const AthletesScreen = () => {

  const [athleteList, setAthleteList] = useState(mockAllAthletes);

  const deleteAthlete = (email) => {
    setAthleteList(athleteList.filter((val) => val.email !== email));
  }

  return (
    <table>
      <thead className="header">
          <tr>
              <th>Nombre</th>
              <th>nickname</th>
              <th>Email</th>
              <th>Sexo</th>
              <th>Competiciones</th>
              <th>Accion</th>
          </tr>
      </thead>

      <tbody>
        {
          athleteList.map((val, key) => {
            return (
              <tr key={val.email}>
                  <td>{val.name}</td>
                  <td>{val.nickname}</td>
                  <td>{val.email}</td>
                  <td>{val.sex}</td>
                  <td>{val.competition}</td>
                  <td ><button className="btn" onClick={()=>{deleteAthlete(val.email)}}>Eliminar</button></td>
              </tr>
            )
          })
        }
      </tbody>
    </table>
  )

}
