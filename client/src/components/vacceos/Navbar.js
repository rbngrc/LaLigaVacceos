import React, { Fragment } from 'react'
import { NavLink } from 'react-router-dom';

import logo from "../../assets/Logotipo Final (Liga Vacceos).png"

import "../../styles/navbar.css";

export const Navbar = () => {

    return (
        <nav>
            <img
                className="logo"
                src={logo}
                width="200px"
                height="200px"
                alt="logo vacceos championship"
            />
                <div
                    className="nav_link"
                >
                    <NavLink
                        activeClassName="active"
                        className="item-link"
                        exact
                        to="/vacceos"
                    >
                        Media
                    </NavLink>
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
                    <NavLink
                        activeClassName="active"
                        className="item-link"
                        exact
                        to="/wod"
                    >
                        Wod
                    </NavLink>
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
        </nav>
    )
}
