import React from 'react'
import {
  ContentActions, ContentHeader, HeadingTitle, HeadingWrapper
} from './style';
import { useSiteHeader } from '../../Hooks/site/use-site-header';

export default ({ children }) => {
  const { title } = useSiteHeader()
  return (
    <>
      <ContentHeader>
        <HeadingWrapper>
          <HeadingTitle>
            {title && title}
          </HeadingTitle>
          <ContentActions>
            {children}
          </ContentActions>
        </HeadingWrapper>
      </ContentHeader>
    </>
  )
}
