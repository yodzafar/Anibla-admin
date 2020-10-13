import styled from "styled-components";

export const PopoverContent = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 160px;
  padding: 8px;
`

export const PopoverContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const PopoverChildren = styled.div`
  display: flex;
  flex-direction: column;
`


export const PopoverContentItem = styled.div`
  cursor:pointer;
  padding: 6px 16px;
  line-height: 1.2;
  font-weight: 600;
  color: #7c8a96;
  white-space: nowrap;
  transition: .2s ease;
  border-top: ${({divider}) => divider ? '1px solid #eff2f7' : 0};
  margin-top: ${({divider}) => divider ? '6px' : 0};
  display: flex;
  align-items: center;
  
  span {
    display: block;
    margin-left: 8px;
  }
  
  &:hover {
    color: #16181b;
    background-color: #f8f9fa;
  }
`