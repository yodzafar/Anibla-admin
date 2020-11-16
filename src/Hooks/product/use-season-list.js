import { useCallback, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getProductInfo } from '../../Models/product'
import { hideModal } from '../../Models/app'
import product from '../../Service/product'

export const useSeasonList = ({ filmId }) => {
  const dispatch = useDispatch()

  const getList = useCallback(() => {
    if (filmId) {
      dispatch(getProductInfo(filmId))
    }
  }, [dispatch, filmId])

  const removeItem = useCallback((id) => {
    product.removeSeason(id)
      .then((res) => {
        if (res.success) {
          getList()
          dispatch(hideModal())
        }
      }).catch((e) => {
        console.log(e);
      })
  }, [getList, dispatch])

  useEffect(() => {
    getList()
  }, [getList])

  return { removeItem }
}
