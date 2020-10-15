import React from "react";
import {ContentContainerInner, MoreIcon, TableLink} from "../../GlobalStyles";
import Table from '../../Table'
import {useSelector} from "react-redux";
import DeleteIcon from "mdi-react/DeleteIcon";
import PencilIcon from "mdi-react/PencilIcon";
import {useHistory} from 'react-router-dom'
import Popover from '../../Popover'
import moment from "moment";
import {ROUTE_URL} from "../../../Constants/url";
import {useGenreList} from "../../../Hooks/genre";
import SettingsIcon from "mdi-react/SettingsIcon";

export default () => {
  const {removeItem} =  useGenreList()
  const {push} = useHistory()
  const genre = useSelector(({genre}) => genre)

  const popoverData = [
    {
      id: 1,
      title: "Tahrirlash",
      icon: <PencilIcon size={16}/>,
      onClick: (id) => push(`/category/edit/${id}`)
    },
    {
      id: 2,
      title: "O'chirish",
      icon: <DeleteIcon size={16}/>,
      onClick: (id) => removeItem(id)
    },
  ]

  const columns= [
    {
      title: 'Janr nomi(uz)',
      key: 'nameuz',
      render: (nameuz, {_id}) => (<TableLink to={`${ROUTE_URL.CATEGORY.EDIT}/${_id}`}>{nameuz}</TableLink>)
    },
    {
      title: 'Janr nomi(ru)',
      key: 'nameru',
      render: (nameru, {_id}) => (<TableLink to={`${ROUTE_URL.CATEGORY.EDIT}/${_id}`}>{nameru}</TableLink>)
    },
    {
      title: 'Yaratilgan sana',
      key: 'createdAt',
      render: (createdAt, {_id}) => (<TableLink to={`${ROUTE_URL.CATEGORY.EDIT}/${_id}`}>
        {moment(createdAt).format("YYYY-MM-DD HH:mm")}
      </TableLink>)
    },
    {
      icon: <SettingsIcon />,
      title: '',
      render: (props, {_id}) => (<Popover popoverData={popoverData} itemId={_id}><MoreIcon /></Popover>),
      width : '1%'
    }
  ]

  return (
    <ContentContainerInner>
      <Table
        columns={columns}
        dataSource={genre.data}
        loading={genre.loading}
      />
    </ContentContainerInner>
  )
}