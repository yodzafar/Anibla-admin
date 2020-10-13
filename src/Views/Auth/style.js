import styled from "styled-components";
import bg_pattern from '../../Assets/images/bg-pattern.png'

export const AuthPageBody = styled.div`
  width: 100vw;
  height: 100vh;
  background-image: url("${bg_pattern}");
  background-size: cover;
  background-repeat: no-repeat;
  background-position:center center;
  background-color:#3051d3;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
`

export const AuthPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 1200px;
  padding-bottom: 200px;
`

export const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  margin-bottom: 48px;
`

export const AuthFormBlock = styled.form`
  display: flex;
  flex-direction: column;
  padding: 36px;
  border-radius: 6px;
  box-shadow: 0 1px 1px rgba(0,0,0,.05);
  background-color: #fff;
  width: 420px;
  max-width: 420px;
`

AuthFormBlock.Heading = styled.div`
  text-align: center;
  font-size: 18px;
  font-weight: 600;
  color: #495057;
  margin-bottom: 48px;
`

export const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 20px;
  margin-bottom: 15px;
`

export const ResetPasswordText = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  color: #7c8a96;
  cursor: pointer;
  transition: .2s ease;
  margin-bottom: 15px;
  
  &:hover {
    color: #3051d3;
  }
`