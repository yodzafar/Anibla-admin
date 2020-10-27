import styled from 'styled-components';

const getFormWidth = ({ maxWidth }) => {
  switch (maxWidth) {
  case 'sm':
    return 600;
  case 'md':
    return 960;
  default:
    return 600;
  }
}

export const FormWrapper = styled.div`
  padding: 24px;
  width: calc(${getFormWidth}px - 64px);
`

export const FormHeading = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
`

export const FormTitle = styled.div`
  font-size: 22px;
  font-weight: 700;
  color: #383c40;
`

export const FormClose = styled.div`
  cursor:pointer;
`
