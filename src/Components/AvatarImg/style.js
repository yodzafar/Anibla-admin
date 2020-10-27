import { Avatar } from '@material-ui/core'
import styled from 'styled-components'

export const StyledAvatar = styled(Avatar)`
  && {
    width: ${({ size }) => (size || 40)}px;
    height: ${({ size }) => (size || 40)}px;
  }
`
