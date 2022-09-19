import React, { useEffect } from "react";
import { useState } from "react";
import Axios from "axios";

import { url } from "../../constans";

import "../../styles/table.css";

export const AthletesScreen = () => {
  const [athleteList, setAthleteList] = useState([]);

  useEffect(() => {
    const getAthletes = async () => {
      const { data: res } = await Axios.get(`${url}atheletes`);
      setAthleteList(res);
    };
    getAthletes();
  }, []);

  const deleteAthlete = (email) => {
    Axios.delete(`${url}atheletes/${email}`).then((response) => {
      setAthleteList(
        athleteList.filter((val) => {
          return val.email !== email;
        })
      );
    });
  };

  return (
    <div className="data-card">
      <table>
        <thead className="header">
          <tr>
            <th>Nombre</th>
            <th>nickname</th>
            <th>Email</th>
            <th>Sexo</th>
            <th>Accion</th>
          </tr>
        </thead>

        <tbody>
          {athleteList.map((val, key) => {
            return (
              <tr key={key}>
                <td>{val.nombre}</td>
                <td>{val.nick}</td>
                <td>{val.email}</td>
                <td>{val.sex}</td>
                <td>
                  <button
                    className="btn"
                    onClick={() => {
                      deleteAthlete(val.email);
                    }}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
