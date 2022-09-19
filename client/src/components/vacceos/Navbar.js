import React, { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { startLogout } from "../../actions/auth";

import logo from "../../assets/Logotipo Final (Liga Vacceos).png";

import "../../styles/navbar.css";

export const Navbar = () => {
  const dispatch = useDispatch();
  const { uid } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(startLogout());
  };

  return (
    <nav>
      <img
        className="logo"
        src={logo}
        width="200px"
        height="200px"
        alt="logo vacceos championship"
      />
      <div className="nav_link">
        <NavLink
          activeClassName="active"
          className="item-link"
          exact
          to="/vacceos"
        >
          Media
        </NavLink>
        {uid === "lbeH4licbFbwPVjPB9BsJo8eult1" ? (
          <Fragment>
            <NavLink
              activeClassName="active"
              className="item-link"
              exact
              to="/athletes"
            >
              Atletas
            </NavLink>
            <NavLink
              activeClassName="active"
              className="item-link"
              exact
              to="/competition"
            >
              Competiciones
            </NavLink>
            <NavLink
              activeClassName="active"
              className="item-link"
              exact
              to="/createWod"
            >
              Crear Wod
            </NavLink>
          </Fragment>
        ) : (
          <NavLink
            activeClassName="active"
            className="item-link"
            exact
            to="/wod"
          >
            Wod
          </NavLink>
        )}
        <NavLink
          activeClassName="active"
          className="item-link"
          exact
          to="/femenino"
        >
          Clas. Femenina
        </NavLink>
        <NavLink
          activeClassName="active"
          className="item-link"
          exact
          to="/masculino"
        >
          Clas. Masculina
        </NavLink>
        <NavLink
          activeClassName="active"
          className="item-link"
          exact
          to="/insertardatos"
        >
          Introduce tu marca
        </NavLink>
        <NavLink
          activeClassName="active"
          className="item-link"
          exact
          to="/perfil"
        >
          Mi perfil
        </NavLink>
      </div>
      <NavLink
        className="btn"
        activeClassName="active"
        exact
        to="/auth"
        onClick={handleLogout}
      >
        Salir
      </NavLink>
    </nav>
  );
};
