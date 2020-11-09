import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom'
import { URL_TITLE } from '../../Constants/url';

export const useSiteHeader = () => {
  const { location } = useHistory()
  const { editID, filmId, seasonId } = useParams()
  const [title, setTitle] = useState(null)
  const { productInfo } = useSelector(({ product }) => product)
  const getTitleFromURL = useCallback(() => {
    const originalPathname = location.pathname
    const pathname = originalPathname.match(/[^/]+(\w+)/) && originalPathname.match(/[^/]+(\w+)/)[0].toUpperCase()
    if (URL_TITLE[pathname]) {
      if (originalPathname.indexOf('add') !== -1) {
        setTitle(URL_TITLE[pathname].TITLE_ADD)
      } else if (originalPathname.indexOf('edit') && editID) {
        setTitle(URL_TITLE[pathname].TITLE_EDIT)
      } else {
        setTitle(URL_TITLE[pathname].TITLE_PLURAL)
      }
    } else {
      setTitle(null)
    }
  }, [editID, location.pathname])

  const getTitle = useCallback(() => {
    if (filmId && productInfo.filmData) {
      if (seasonId && productInfo.seasonInfo) {
        setTitle(productInfo.seasonInfo.name.uz)
      } else {
        setTitle(productInfo.filmData.name.uz)
      }
    } else {
      getTitleFromURL()
    }
  }, [getTitleFromURL, filmId, productInfo.filmData, productInfo.seasonInfo, seasonId])

  useEffect(() => {
    getTitle()
  }, [getTitle])

  return { title }
}
