import React from 'react';
import { useState } from "react";
import Axios from 'axios';

export const ManTable = () => {

  const [athleteList, setAthleteList] = useState([]);

  const getAthletes = () => {
    Axios.get('http://localhost:3001/atletasMasculinos').then((response) => {
      setAthleteList(response.data)
      })
  }

  getAthletes();

  return (
    <table>
      <thead className="header">
          <tr>
              <th>Posición</th>
              <th>Nombre</th>
              <th>Puntuación</th>
              <th>Mejor Puesto</th>
          </tr>
      </thead>
      
      <tbody>
        {
          athleteList.map((val, key) => {
            return (
              <tr>
                  <td>{val.position}</td>
                  <td>{val.photo}</td>
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
