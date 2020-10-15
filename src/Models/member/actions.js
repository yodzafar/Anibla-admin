import {MEMBER_ACTION_TYPES} from "../../Constants/action-types/member";
import member from "../../Service/member";

export const getMemberList = () => dispatch => {
  dispatch({type: MEMBER_ACTION_TYPES.MEMBER_LOADING, pending: true})
  member.getAllMember()
    .then(res => {
      if(res.success) {
        dispatch({type: MEMBER_ACTION_TYPES.MEMBER_LOADED, data: res.data.map(item => ({...item, key: item._id}))})
      }
    }).finally(() => dispatch({type: MEMBER_ACTION_TYPES.MEMBER_LOADING, pending: false}))
    .catch(e => {
      console.log(e);
    })
}