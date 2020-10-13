import styled from "styled-components";

export const LogoBrand = styled.div`
  font-size: ${({logoSize}) =>  logoSize ? `${logoSize}px` : '24px'};
  font-family: var(--brand-font-family);
  text-align: ${({textAlign}) => textAlign ? textAlign : 'left'};
  div {
    font-family: "Montserrat", sans-serif;
    font-weight: 200;
    font-size: ${({logoTextSize}) =>  logoTextSize ? `${logoTextSize}px` : '12px'};
    
    span {
      font-weight: 500;
    }
  }
`