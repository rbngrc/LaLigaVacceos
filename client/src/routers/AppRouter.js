import React from 'react'
import {
    BrowserRouter as Router,
  } from "react-router-dom";

import { DashboardRoutes } from './DashboardRoutes';

export const AppRouter = () => {
    return (
      <Router>
          <DashboardRoutes />
      </Router>
    )
}
