import {useCallback, useEffect, useState} from "react";
import {useHistory, useParams} from 'react-router-dom'
import {URL_TITLE} from "../../Constants/url";

export const useSiteHeader = () => {
  const {location} = useHistory()
  const {editID} = useParams()

  const [title, setTitle] = useState(null)

  const getTitle = useCallback(() => {
    const originalPathname = location.pathname
    const pathname = originalPathname.match(/[^/]+(\w+)/) && originalPathname.match(/[^/]+(\w+)/)[0].toUpperCase()
    if(URL_TITLE[pathname]) {
      if(originalPathname.indexOf('add') !== -1) {
        setTitle(URL_TITLE[pathname].TITLE_ADD)
      }else if(originalPathname.indexOf('edit') && editID){
        setTitle(URL_TITLE[pathname].TITLE_EDIT)
      }else {
        setTitle(URL_TITLE[pathname].TITLE_PLURAL)
      }

    }else {
      setTitle(null)
    }
  }, [location.pathname, editID])

  useEffect(() => {
    getTitle()
  }, [getTitle])

  return {title}
}