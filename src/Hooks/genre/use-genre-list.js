import {useCallback, useEffect} from "react";
import {useDispatch} from "react-redux";
import {getGenreList} from "../../Models/genre";
import genre from "../../Service/genre";

export const useGenreList = () => {
  const dispatch = useDispatch()

  const getList = useCallback(() => {
    dispatch(getGenreList())
  }, [dispatch])

  const removeItem = useCallback((id) => {
    genre.removeGenre(id)
      .then((res) => {
        if(res.success) {
          getList()
        }
      }).catch((e) => {
      console.log(e);
    })
  }, [getList])

  useEffect(() => {
    getList()
  }, [getList])

  return {removeItem}
}