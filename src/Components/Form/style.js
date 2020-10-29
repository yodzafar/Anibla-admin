import styled from 'styled-components';
import { getWidth } from '../../utils/cssUtils';

export const FormWrapper = styled.div`
  padding: 24px;
  width: calc(${getWidth}px - 64px);
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
