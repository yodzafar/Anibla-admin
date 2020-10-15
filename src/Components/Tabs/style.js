import styled from "styled-components";

export const TabContainer = styled.div``

export const TabList = styled.div`
  display: flex;
  align-items: center;
`

export const TabItem = styled.div`
  cursor: pointer;
  padding: 8px 18px;
  background: ${({active}) => active ? '#fff' : 'none'};
  box-shadow: ${({active}) => active ? '0 -1px 3px rgba(0,0,0,.03)' : 'unset'};
  border-top-left-radius: var(--common-border-radius);
  border-top-right-radius: var(--common-border-radius);
  font-weight: 600;
  color: ${({active, formError}) => formError ? 'var(--danger) !important' : active ? '#495057' : '#7c8a96'};
  transition: .3s ease-in-out;
  border: 1px solid rgba(0,0,0, .2);
`

export const TabContent = styled.div`
  display: flex;
  flex-direction: column;
  padding: ${({innerOffset}) => innerOffset ? innerOffset : 12}px;
  background-color: #fff;
  border-radius: var(--common-border-radius);
  border-top-left-radius: 0;
  border: 1px solid rgba(0,0,0, .2);
`

export const TabContentItem = styled.div`
  display: ${({active}) => active ? 'flex': 'none'};
`