import styled from "styled-components";
import bg_pattern from "../../Assets/images/bg-pattern.png";
import {Button} from "@material-ui/core";

export const ContentHeader = styled.div`
  padding: 24px;
  background-color: #3051d3;
  background-image: url('${bg_pattern}');
  background-size: cover;
`

export const HeadingWrapper = styled.div`
  display: flex;
  align-items: center;
  min-height: 44px;
`

export const HeadingTitle = styled.div`
  font-weight: 700;
  font-size: 20px;
  font-family: 'Nunito', sans-serif;
  color: #fff;
`

export const AddButton = styled(Button)`
  && {
    margin-left: auto;
    padding: 6px 16px;
    text-transform: unset;
    border-radius: 20px;
    background-color: #eff2f7;
    border: 1px solid #eff2f7;
    display: flex;
    align-items: center;
    color: #212529;
    min-width: unset;
    white-space: nowrap;
    
    div {
      margin-left: 8px;
    }
    
    &:hover {
      background-color: #d6ddea;
    }
  }
`

export const ContentActions = styled.div `
margin-left: auto;
`
