import React, { useEffect } from 'react';
import { useState } from "react";
import Axios from 'axios';

// import { firebase } from "../../firebase/firebase-config"

import { url } from '../../constans';

import '../../styles/table.css';

export const AthletesScreen = () => {

  const [athleteList, setAthleteList] = useState([]);

  useEffect(() => {
    const getAthletes = async (name) => {
        const {data:res} = await Axios.get(url + 'atletas');
            setAthleteList(res);
          };
          getAthletes();
    }, []);

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
            console.log(val.name)
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


