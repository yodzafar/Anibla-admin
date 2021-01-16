import styled from 'styled-components';
import MoreVertIcon from 'mdi-react/MoreVertIcon';

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
  justify-content: center;
  margin-top: 32px;
  
  button {
    margin: 0 12px;
    min-width: 120px;
  }
`

export const MoreIcon = styled(MoreVertIcon)`
  color: #7c8a96;
  font-size: 18px;
`

export const TableLink = styled.div`
  color: #333;
  font-weight: 550;
  font-size: 15px;
  padding: 16px;
  cursor: ${({ link }) => (link ? 'pointer' : 'unset')};
`

export const SectionForm = styled.form`
  display: flex;
  flex-direction: column;
`

export const Grid = styled.div`
  display: grid;
  grid-template-columns: ${({ perColumn }) => (perColumn ? `repeat(${perColumn}, 1fr)` : '1fr')};
  grid-gap: 16px;
`
export const GridItem = styled.div`
  ${(props) => props.gridColumn && `grid-column: ${props.gridColumn}`};
  display: flex;
  flex-direction: column;
`

export const DisabledContainer = styled.div`
  position: relative;

  &::before {
    content: '';
    display: ${({ disabled }) => (disabled ? 'block' : 'none')};
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, .4);
    position: absolute;
    left: 0;
    right: 0;
    z-index: 20;
  }
`

export const StatusBadge = styled.span`
  display: inline-block;
  padding: 4px 8px;
  line-height: 1.2;
  color: #fff;
  background-color: ${({status}) => status ? 'var(--success)' : 'var(--danger)'};
  font-size: 14px;
  font-weight: 500;
  border-radius: 3px;
  text-transform: lowercase;
`

export const ShowVideo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`
