import React from 'react'
import {
  BrowserRouter as Router, Switch, Route, Redirect
} from 'react-router-dom'
import { AppContainer, AppContent } from './style';
import Navbar from '../../Components/Navbar';
import Sidebar from '../../Components/Sidebar';
import routes from '../../Routes/index'
import { AppModal } from '../../Components/Modal';
import {AppSnackBar} from "../../Components/Snackbar";
import {useSelector} from "react-redux";

export default () => {
  const {miniSidebar} = useSelector(({app}) => app)

  return (
      (
          <Router>
            <AppContainer>
              <Navbar />
              <Sidebar />
              <AppContent minisidebar={miniSidebar}>
                <AppSnackBar />
                <AppModal />
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
  )
}
