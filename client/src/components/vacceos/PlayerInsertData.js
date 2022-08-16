import React from 'react'
// import { useDispatch, useSelector } from 'react-redux';
import { useForm } from '../../hooks/useForms';

import '../../styles/insertData.css';

export const PlayerInsertData = () => {
  
  const [formValues, handleInputChange] = useForm({
      date: "",
      rounds: "",
      reps: "",
      min: "",
      sec: "",
      weight: "",
  });
  
  const {date, rounds, reps, min, sec, weight} = formValues;

  const handleAddData = (e) => {

      e.preventDefault();

      console.log(min, sec, rounds, reps, weight, date);
  }

   return (
        <div className="data-card">
            <div className="wod-title">
                <h1>Introduce tu marca</h1>
                <hr/>
            </div>
            <div>
                <form onSubmit={handleAddData} id="form-marca">
                    <div className="form-group">
                        <input 
                            type="date" 
                            min="2021-10-01" 
                            max="2022-06-31" 
                            name="date"
                            onChange={handleInputChange}
                        />
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
                        <button 
                            type="submit" 
                            className="btn btn-primary my-1" 
                            id="btnMarca"
                        >
                            Subir Marca
                        </button>
                </form>
            </div>
        </div>
    )
}
