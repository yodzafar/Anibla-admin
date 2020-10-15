import styled from "styled-components";
import MoreVertIcon from "mdi-react/MoreVertIcon";
import {Link} from "react-router-dom";

export const ContentContainer = styled.div`
  padding: 24px;
  margin: 0 0 24px 0;
  z-index: 10;
  flex-direction: column;
  display: flex;
`

export const ContentContainerInner = styled.div`
  display: flex;
  flex-direction: column;
  padding: 24px;
  background-color: #fff;
  box-shadow: 0 1px 1px rgba(0,0,0,.05);
  border-radius: var(--common-border-radius); 
`

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 16px 0;
`

export const MoreIcon = styled(MoreVertIcon)`
  color: #7c8a96;
  font-size: 18px;
`

export const TableLink = styled(Link)`
  display: flex;
  flex-direction: column;
  color: #333;
  font-weight: 500;
  font-size: 15px;
`

export const SectionForm = styled.form `
  display: flex;
  flex-direction: column;
`