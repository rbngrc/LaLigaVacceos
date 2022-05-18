import React from 'react'
import {  useState } from "react";
import Axios from 'axios';


export const AthletesScreen = () => {

  const [employeeList, setEmployeeList] = useState([]);


  const getAthletes = () => {
    Axios.get('http://localhost:3001/atletas').then((response) => {
      setEmployeeList(response.data)
    });
  };

  const deleteAthlete = (email) => {
    Axios.delete(`http://localhost:3001/delete/${email}`).then((response) => {
      setEmployeeList(employeeList.filter((val) => {
        return val.email !== email
      }))
    })
  };

  return (
      <div className='employees'>
        <button onClick={getAthletes}>Show Employees</button>

        {employeeList.map((val, key) => {
          return (
            <div className='employee'>
              <div>
                <h3>nombre: {val.name}</h3>
                <h3>email: {val.email}</h3>
                <h3>nickname: {val.nickname}</h3>
                <h3>sex: {val.sex}</h3>
              </div>
              <div>
                <button onClick={()=>{deleteAthlete(val.email)}}>Eliminar</button>
              </div>
            </div>
          )
        })}
      </div>
  );
}
