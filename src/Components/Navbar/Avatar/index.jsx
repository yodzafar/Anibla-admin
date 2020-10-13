import React, {useEffect} from 'react'
import {AvatarContainer, AvatarInfo, AvatarWrapper, DownIcon} from "./style";
import AvatarImg from "../../AvatarImg";
import Popover from "../../Popover";
import {useDispatch, useSelector} from "react-redux";
import {authMe, logout} from "../../../Models/auth";
import FaceProfileIcon from 'mdi-react/FaceProfileIcon'
import LogoutIcon from 'mdi-react/LogoutIcon'

export default () => {
  const dispatch = useDispatch()
  const accountInfo = useSelector(({auth}) => auth.data)

  useEffect(() => {
    dispatch(authMe())
  }, [dispatch])

  const data = [
    {
      id: 1,
      title: 'Profil sozlash',
      icon: <FaceProfileIcon size={16}/>,
      onClick: () => alert('profile click')
    },
    {
      id: 2,
      title: 'Tizimdan chiqish',
      icon: <LogoutIcon size={16}/>,
      onClick: () => dispatch(logout()),
      divider: true
    }
  ]


  return (
    <AvatarContainer>
      <Popover
        popoverData={data}
      >
        <AvatarWrapper>
          <AvatarImg
            name={accountInfo.name && accountInfo.name}
            imgUrl='no-image'
          />
          <AvatarInfo>
            {accountInfo.name && accountInfo.name}
            {accountInfo.role && <span>{accountInfo.role}</span>}
          </AvatarInfo>

          <DownIcon
            size={16}
          />
        </AvatarWrapper>
      </Popover>
    </AvatarContainer>
  )
}