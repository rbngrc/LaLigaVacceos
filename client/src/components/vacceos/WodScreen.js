import React, { useEffect, useState } from 'react';
import Axios from 'axios';

import '../../styles/wodScreen.css'

import { url } from '../../constans';

export const WodScreen = () => {

    const [competitionList, setCompetitionList] = useState([]);
    const [wodsList, setWodsList] = useState([]);
    const [selects, setSelects] = useState([]);

    useEffect(() => {
        const getWods = async (selects) => {
            const {data:res} = await Axios.get(url + `wods/${selects}`);
              setWodsList(res);
              };
              getWods(selects);
        }, [selects]);

        useEffect(() => {
            const getCompetitions = async () => {
                    const {data:res} = await Axios.get(url + 'competiciones');
                        setCompetitionList(res)
                };
                getCompetitions()
          }, [])

  return (
    <div>
        <div className="wod-card">
        <div 
          className="textbox"
        >
          <select 
              className="textcombo"
              onChange={e => setSelects(e.target.value)}
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
        {
                wodsList.map((val, key) => {
                  return (
                    <div key={val.date}>
                    <div className="wod-title">
                        <h1>{val.name}</h1>
                        <hr/>
                    </div>
                    <div className="wod-title">
                        <h3>{val.date}</h3>
                        <hr/>
                    </div>
                    <div className="wod-body">
                        <p>{val.wod}</p>
                        </div>
                    </div>
                  )
                })
              }  
        </div>
    </div>
)
}
