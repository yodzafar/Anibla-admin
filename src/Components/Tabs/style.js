/* eslint-disable no-nested-ternary */
import styled from 'styled-components';

export const TabContainer = styled.div``

export const TabList = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 24px;
`

export const TabItem = styled.div`
  cursor: pointer;
  padding: 12px 24px;
  background: ${({ active }) => (active ? '#f4f8f9' : '#fff')};
  box-shadow: 0, 6px 12px rgba(0,0,0, .1);
  font-weight: 600;
  color: ${({ active, formError }) => (formError ? 'var(--danger) !important' : active ? '#495057' : '#7c8a96')};
  transition: .3s ease-in-out;
  border-radius: var(--common-border-radius);
`

export const TabContent = styled.div`
  display: flex;
  flex-direction: column;
  padding: ${({ innerOffset }) => (innerOffset || 0)}px;
  background-color: #fff;
  border-top-left-radius: 0;
`

export const TabContentItem = styled.div`
  display: ${({ active }) => (active ? 'block' : 'none')};
`
