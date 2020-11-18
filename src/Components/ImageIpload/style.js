import styled from 'styled-components'

export const ImageUploadWrapper = styled.div`
  min-height: 70px;
  border: 2px dashed ${({ error }) => (error ? 'var(--danger)' : '#8E8E93')};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 24px;
  cursor: pointer;
  margin-bottom: 16px;
`

export const DangerText = styled.div`
  color: var(--danger)
`

export const ImageUploadInner = styled.div`
  display: flex;
  align-items: center;
`

export const ImageUploadText = styled.div`
  font-size: 18px;
  font-weight: 700;
  margin-left: 16px;
`

export const ImageItemAction = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0, .3);
  z-index: 3;
  opacity: 0;
  transition: .2s ease;

  div{
    width: 30px;
    height: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    color: #fff;
  }
`

export const ImageWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 16px;
`

export const ImageItem = styled.div`
  position: relative;
  background-image: url("${({ imgUrl }) => imgUrl}");
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  width: 100%;
  height: 130px;

  &:hover ${ImageItemAction}{
    opacity: 1  
  }
`;
