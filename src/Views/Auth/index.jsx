import React from 'react'
import {AuthPageBody, AuthPageContainer, LogoContainer} from "./style"
import LogoBrand from '../../Components/Logo'
import AuthForm from './AuthForm'

export default () => {
  return (
    <AuthPageBody>
      <AuthPageContainer>
        <LogoContainer>
          <LogoBrand
            logoSize={48}
            logoTextSize={14}
            textAlign='center'
          />
        </LogoContainer>
        <AuthForm/>
      </AuthPageContainer>
    </AuthPageBody>
  )
}