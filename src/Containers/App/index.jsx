import React from 'react'
import {AppContainer, AppContent} from "./style";
import Navbar from "../../Components/Navbar";
import Sidebar from "../../Components/Sidebar";
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import routes from '../../Routes/index'

export default () => {
  return (
    <Router>
      <AppContainer>
        <Navbar/>
        <Sidebar/>
        <AppContent>

          <Switch>
            {
              routes.map(route => (
                <Route key={route.id} exact path={route.path} component={route.component}/>
              ))
            }
          </Switch>
        </AppContent>
      </AppContainer>
    </Router>
  )
}