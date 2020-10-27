import { useCallback, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getProductList } from '../../Models/product'

export const useProductList = () => {
  const dispatch = useDispatch()

  const getList = useCallback(() => {
    dispatch(getProductList())
  }, [dispatch])

  useEffect(() => {
    getList()
  }, [getList])

  return {}
}
