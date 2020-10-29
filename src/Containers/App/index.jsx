import React from 'react'
import {
  BrowserRouter as Router, Switch, Route, Redirect
} from 'react-router-dom'
import { AppContainer, AppContent } from './style';
import Navbar from '../../Components/Navbar';
import Sidebar from '../../Components/Sidebar';
import routes from '../../Routes/index'
import { SiteModal } from '../../Components/Modal';

export default () => (
  <Router>
    <AppContainer>
      <Navbar />
      <Sidebar />
      <AppContent>
        <SiteModal />
        <Switch>
          {
            routes.map((route) => (
              <Route key={route.id} exact path={route.path} component={route.component} />
            ))
          }
          <Redirect from="*" to="/" />
        </Switch>
      </AppContent>
    </AppContainer>
  </Router>
)
