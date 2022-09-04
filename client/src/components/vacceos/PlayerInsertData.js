import React, { useEffect, useState } from "react";
import Axios from "axios";
// import { useDispatch, useSelector } from 'react-redux';
import { useForm } from "../../hooks/useForms";

import { url } from "../../constans";

import "../../styles/insertData.css";

export const PlayerInsertData = () => {
  const [competitionList, setCompetitionList] = useState([]);
  const [selects, setSelects] = useState([]);

  useEffect(() => {
    const getCompetitions = async () => {
      const { data: res } = await Axios.get(`${url}competitions`);
      setCompetitionList(res);
    };
    getCompetitions();
  }, []);

  const [formValues, handleInputChange] = useForm({
    date: "",
    rounds: "",
    reps: "",
    min: "",
    sec: "",
    weight: "",
  });

  const { date, rounds, reps, min, sec, weight } = formValues;

  const handleAddData = (e) => {
    e.preventDefault();

    console.log(min, sec, rounds, reps, weight, date);
  };

  console.log(selects);

  return (
    <div className="data-card">
      <div className="wod-title">
        <h1>Introduce tu marca</h1>
        <hr />
      </div>
      <div>
        <form onSubmit={handleAddData} id="form-marca">
          <div className="form-group">
            <select
              className="textcombo"
              onChange={(e) => setSelects(e.target.value)}
            >
              <option>Selecciona liga</option>
              {competitionList.map((val, key) => {
                return (
                  <option id="competitionName" key={key} value={val.nombreComp}>
                    {val.nombreComp}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="form-group">
            <select
              className="textcombo"
              onChange={(e) => setSelects(e.target.value)}
            >
              <option>Selecciona WOD</option>
              {competitionList.map((val, key) => {
                return (
                  <option id="competitionName" key={key}>
                    {val.fecha}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="form-group">
            <input
              type="number"
              name="rounds"
              className="form-control"
              id="exampleFormControlInput1"
              placeholder="Rondas"
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <input
              type="number"
              name="reps"
              className="form-control"
              id="exampleFormControlInput1"
              placeholder="Repeticiones"
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <input
              type="number"
              name="min"
              min="0"
              max="60"
              className="form-control"
              id="exampleFormControlInput1"
              placeholder="Minutos"
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <input
              type="number"
              name="sec"
              min="0"
              max="59"
              className="form-control"
              id="exampleFormControlInput1"
              placeholder="Segundos"
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <input
              type="number"
              name="weight"
              className="form-control"
              id="exampleFormControlInput1"
              placeholder="Kilogramos"
              onChange={handleInputChange}
            />
          </div>
          <button type="submit" className="btn btn-primary my-1" id="btnMarca">
            Subir Marca
          </button>
        </form>
      </div>
    </div>
  );
};
