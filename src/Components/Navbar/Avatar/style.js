import styled from "styled-components";
import ChevronDownIcon from "mdi-react/ChevronDownIcon";
import {BurgerButton} from "../style";

export const AvatarWrapper = styled(BurgerButton)`
  && {
    display: flex;
    align-items: center;
    margin-left: auto;
  }
`

export const AvatarContainer = styled.div`
  margin-left: auto;
`

export const DownIcon = styled(ChevronDownIcon)`
  && {
    color: #fff;
  }
`

export const AvatarInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  color: #fff;
  margin: 0 8px 0 12px;
  font-weight: 600;
  line-height: 1.2;
  font-family: 'Nunito', sans-serif;
  
  span{
    font-weight: 300;
    font-size: 12px;
  }
`