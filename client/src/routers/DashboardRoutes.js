import React, { Fragment } from 'react'
import { Navbar } from '../components/vacceos/Navbar';
import {
    Redirect,
    Switch,
    Route
  } from "react-router-dom";

import { VacceosScreen } from '../components/vacceos/VacceosScreen';
import { WodScreen } from '../components/vacceos/WodScreen';
import { WomanTable } from '../components/vacceos/WomanTable';
import { ManTable } from '../components/vacceos/ManTable';
import { PlayerInsertData } from '../components/vacceos/PlayerInsertData';
import { PlayerInfoScreen } from '../components/vacceos/PlayerInfoScreen';

export const DashboardRoutes = () => {
  return (
    <Fragment>
    <Navbar />

    <div>
        <Switch>       
            <Route 
                exact path="/vacceos" 
                component = { VacceosScreen }
            />
            <Route 
                exact path="/wod" 
                component={WodScreen}
            />
            <Route 
                exact path="/femenino" 
                component={WomanTable}
            />
            <Route 
                exact path="/masculino" 
                component={ManTable} 
            />
            <Route 
                exact path="/insertardatos" 
                component={PlayerInsertData} 
            />
            <Route 
                exact path="/perfil" 
                component={PlayerInfoScreen} 
            />
            <Route
                exact path="/competition"
                // component={CompetitionScreen}
            />
            <Route
                exact path="/athletes"
                // component={AthletesScreen}
            />
            <Route
                exact path="/daily"
                // component={DailyScreen}
            />
            <Route
                exact path="/admin"
                // component={AdminDashboard}
            />

            <Redirect to= "/vacceos" />
        </Switch>
    </div>
</Fragment>
  )
}
