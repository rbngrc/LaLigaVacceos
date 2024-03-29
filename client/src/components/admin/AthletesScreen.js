import React from 'react';
import { useState } from "react";
import Axios from 'axios';

// import { firebase } from "../../firebase/firebase-config"

import '../../styles/table.css';


export const AthletesScreen = () => {

  const url = "http://localhost:3001/"

  const [athleteList, setAthleteList] = useState([]);

    const getAthletes = () => {
        Axios.get(url + 'atletas').then((response) => {
          setAthleteList(response.data)
          })
    }

        const deleteAthlete = (email) => {
        Axios.delete(url + `delete/${email}`).then((response) => {
          setAthleteList(athleteList.filter((val) => {
            return val.email !== email
            }));
        });
    }

    // firebase.auth().delete(email).then(() => {
    //     console.log("Usuario borrado")
    //   }).catch((error) => {
    //     console.log(error)
    //   });

  // };

    getAthletes();

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


