import { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getCategoryList } from '../../Models/category';
import category from '../../Service/category';

export const useCategoryList = () => {
  const dispatch = useDispatch()

  const getList = useCallback(() => {
    dispatch(getCategoryList())
  }, [dispatch])

  const removeItem = useCallback((id) => {
    category.removeCategory(id)
      .then((res) => {
        if (res.success) {
          getList()
        }
      }).catch((e) => {
        console.log(e);
      })
  }, [getList])

  useEffect(() => {
    getList()
  }, [getList])

  return { removeItem }
}
