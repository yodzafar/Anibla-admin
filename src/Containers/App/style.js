import styled from 'styled-components'

export const AppContainer = styled.div`
  width: 100vw;
  min-height: 100vh;
`

export const AppContent = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: var(--navbar-height);
  margin-left: var(--sidebar-width);
  min-height: calc(100vh - var(--navbar-height));
  width: calc(100vw - var(--sidebar-width));
`