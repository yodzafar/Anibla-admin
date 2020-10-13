import styled from "styled-components";
import {TableCell} from "@material-ui/core";

export const StyledTableCell = styled(TableCell)`
   &&{
      color: #696c70;
      background-color: #f5f6f8;
      border-color: #eff2f7;
      border-bottom: 2px solid #eff2f7;
      font-weight: 700;
      font-family: 'Nunito', sans-serif;
      font-size: 16px;
   }
`

export const TableContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`

export const TableLoadingData = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column; 
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, .5);
  z-index: 3;
`