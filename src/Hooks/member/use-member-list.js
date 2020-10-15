import {useDispatch} from "react-redux";
import {useCallback, useEffect} from "react";
import {getMemberList} from "../../Models/member";
import member from "../../Service/member";

export const useMemberList = () => {
  const dispatch = useDispatch()

  const getList = useCallback(() => {
    dispatch(getMemberList())
  }, [dispatch])

  const removeItem = useCallback((id) => {
    member.removeMember(id)
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

  return {removeItem, getList}
}