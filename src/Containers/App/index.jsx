import React from 'react'
import {RootContainer} from "../../Root/style";
import Navbar from "../../Components/Navbar";
import Sidebar from "../../Components/Sidebar";
import {BrowserRouter as Router} from "react-router-dom";

export default () => {
  return (
    <Router>
      <RootContainer>
        <Navbar/>
        <Sidebar/>
      </RootContainer>
    </Router>
  )
}