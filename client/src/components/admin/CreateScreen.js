import React, { Fragment, useState } from 'react';

import { mockCompetitions, mockWods } from '../../mocks/data';

export const CreateScreen = () => {

    const [competitionList] = useState(mockCompetitions);
    const [wodsByCompetition, setWodsByCompetition] = useState(mockWods);
    const [compName, setCompName] = useState(mockCompetitions[0]?.name ?? "");
    const [wodName, setWodName] = useState("");

    const wodsList = wodsByCompetition[compName] || [];

    const addWod = () => {
      if (!compName || !wodName) return;

      setWodsByCompetition({
        ...wodsByCompetition,
        [compName]: [...wodsList, { name: wodName }],
      });
      setWodName("");
    }

    return (
      <Fragment>
      <div className="textbox">
        <select
            className="textcombo"
            name="competition"
            value={compName}
            onChange={(event) => {
              setCompName(event.target.value);
            }}
        >
        {
            competitionList.map((val, key) => {
                return (
                    <option
                    key={val.name}
                    value={val.name}
                    >{val.name}</option>
                )
            })
        }
        </select>
      </div>
        <table>
          <thead className="header">

              <tr>
                  <th>Nombre del wod</th>
                  <th>WOD</th>
                  <th>Accion</th>
              </tr>
          </thead>
          <tbody>
          <tr>
              <td>
                <input
                    type="text"
                    placeholder="Nombre del wod"
                    name="name"
                    autoComplete="off"
                    value={wodName}
                    onChange={(event) => setWodName(event.target.value)}
                />
              </td>
              <td>
                <textarea
                    type="text"
                    placeholder="WOD"
                    name="wod"
                    autoComplete="off"
                />
              </td>
              <td><button className="btn" onClick={()=>{addWod()}}>Nuevo</button></td>
            </tr>
            {
              wodsList.map((val, key) => {
                return (
                  <tr key={val.name}>
                      <td>{val.name}</td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
        </Fragment>
    )
}
