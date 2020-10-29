import styled from 'styled-components'
import { getWidth } from '../../utils/cssUtils'

export const ConfirmContainer = styled.div`
    width: calc(${getWidth}px - 64px);
    padding: 24px;
`

export const ConfirmContentBody = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 24px;

    h2 {
        margin: 24px 0 12px 0;
        font-size: 32px;
    }

    p {
        font-size: 16px;
    }
`
