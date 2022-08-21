import { useState, useEffect } from "react";
import Axios from 'axios';

import { url } from '../constans';

export const usePoints = (initialState = []) => {

  const [athleteList, setAthleteList] = useState([]);

  useEffect(() => {
    const getAthletes = async (name) => {
        const {data:res} = await Axios.get(url + 'atletas');
            setAthleteList(res);
          };
          getAthletes();
    }, []);

  athleteList.map((val, key) => {
    const name = val.name
    return console.log(name + " normal")
  }) 

  athleteList.reverse().map((val, key) => {
    const name = val.name
    return console.log(name + " al reves")
  }) 

  for (let i = 0; i < athleteList.length; i++) {
    const element = i;
    console.log(element)
  }
  return athleteList

} 