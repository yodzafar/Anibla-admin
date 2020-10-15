import React from "react";
import {ContentContainerInner, MoreIcon, TableLink} from "../../GlobalStyles";
import Table from '../../Table'
import {useDispatch, useSelector} from "react-redux";
import DeleteIcon from "mdi-react/DeleteIcon";
import PencilIcon from "mdi-react/PencilIcon";
import Popover from '../../Popover'
import moment from "moment";
import {ROUTE_URL} from "../../../Constants/url";
import {useGenreList} from "../../../Hooks/genre";
import SettingsIcon from "mdi-react/SettingsIcon";
import {showModal} from "../../../Models/site";
import {GenreForm} from "../index";

export default () => {
  const {removeItem} =  useGenreList()
  const dispatch = useDispatch()
  const genre = useSelector(({genre}) => genre)

  const renderModal = (id) => ({
    open: true,
    component: <GenreForm id={id} />,
    props: null
  })

  const popoverData = [
    {
      id: 'edit',
      title: "Tahrirlash",
      icon: <PencilIcon size={16}/>,
      onClick: (id) => dispatch(showModal(renderModal(id)))
    },
    {
      id: 'delete',
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