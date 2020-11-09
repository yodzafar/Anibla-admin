import { useDispatch } from 'react-redux';
import { useCallback, useEffect } from 'react';
import { getMemberList } from '../../Models/member';
import member from '../../Service/member';
import { hideModal } from '../../Models/site';

export const useMemberList = () => {
  const dispatch = useDispatch()

  const getList = useCallback(() => {
    dispatch(getMemberList())
  }, [dispatch])

  const removeItem = useCallback((id) => {
    member.removeMember(id)
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

  return { removeItem, getList }
}
