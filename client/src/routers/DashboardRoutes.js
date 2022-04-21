import React, { Fragment } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'

import { AdminDashboard } from '../components/admin/AdminDashboard'
import { AthletesScreen } from '../components/admin/AthletesScreen'
import { CompetitionScreen } from '../components/admin/CompetitionScreen'
import { DailyScreen } from '../components/admin/DailyScreen'
import { MenTable } from '../components/league/MenTable'
import { WodScreen } from '../components/league/WodScreen'
import { WomenTable } from '../components/league/WomenTable'
import { PlayerInfo } from '../components/player/PlayerInfo'
import { PlayerInsertData } from '../components/player/PlayerInsertData'
import { BoxScreen } from '../components/ui/BoxScreen'
import { Navbar } from '../components/ui/Navbar'

export const DasboardRoutes = () => {
    return (
        <Fragment>
            <Navbar />

            <div>
                <Switch>       
                    <Route 
                        exact path="/box" 
                        component={BoxScreen}
                    />
                    <Route 
                        exact path="/wod" 
                        component={WodScreen}
                    />
                    <Route
                        exact path="/admin"
                        component={AdminDashboard}
                    />
                    <Route 
                        exact path="/femenino" 
                        component={WomenTable}
                    />
                    <Route 
                        exact path="/masculino" 
                        component={MenTable} 
                    />
                    <Route 
                        exact path="/insertardatos" 
                        component={PlayerInsertData} 
                    />
                    <Route 
                        exact path="/perfil" 
                        component={PlayerInfo} 
                    />
                    <Route
                        exact path="/competition"
                        component={CompetitionScreen}
                    />
                    <Route
                        exact path="/athletes"
                        component={AthletesScreen}
                    />
                    <Route
                        exact path="/daily"
                        component={DailyScreen}
                    />

                    <Redirect to="/box" />
                </Switch>
            </div>
        </Fragment>
    )
}
