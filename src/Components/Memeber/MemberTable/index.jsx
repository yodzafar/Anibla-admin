import React from 'react'
import {useSelector} from "react-redux";
import DeleteIcon from "mdi-react/DeleteIcon";
import {ContentContainerInner, MoreIcon, TableLink} from "../../GlobalStyles";
import moment from "moment";
import SettingsIcon from "mdi-react/SettingsIcon";
import Popover from "../../Popover";
import Table from "../../Table";
import {useMemberList} from "../../../Hooks/member";
import Avatar from '../../AvatarImg'

const baseUrl = process.env.REACT_APP_BASE_URL

export default () => {
  const {removeItem} = useMemberList()
  const member = useSelector(({member}) => member)
  const popoverData = [
    {
      id: 'delete',
      title: "O'chirish",
      icon: <DeleteIcon size={16}/>,
      onClick: (id) => removeItem(id)
    },
  ]

  const columns = [
    {
      title: 'Rasm',
      key: 'image',
      render: (nameuz, {image, name}) => (<TableLink>
        <Avatar imgUrl={`${baseUrl}${image}`} name={name}/>
      </TableLink>)
    },
    {
      title: 'Ishtirokchi FISH',
      key: 'name',
      render: (nameuz) => (<TableLink>{nameuz}</TableLink>)
    },
    {
      title: 'Yaratilgan sana',
      key: 'createdAt',
      render: (createdAt) => (<TableLink>{moment(createdAt).format("YYYY-MM-DD HH:mm")}</TableLink>)
    },
    {
      icon: <SettingsIcon/>,
      title: '',
      render: (props, {_id}) => (<Popover popoverData={popoverData} itemId={_id}><MoreIcon/></Popover>),
      width: '1%'
    }
  ]

  return (
    <ContentContainerInner>
      <Table
        columns={columns}
        dataSource={member.data}
        loading={member.loading}
      />
    </ContentContainerInner>
  )
}