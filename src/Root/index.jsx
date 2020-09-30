import React from 'react'
import {useSelector} from "react-redux";
import App from '../Containers/App'
import Auth from '../Containers/Auth'


export default () => {
  const auth = useSelector(({auth}) => auth)

  return (
    <>
      {
        auth.token
        ? <App />
        :<Auth />
      }
    </>
  );
}
