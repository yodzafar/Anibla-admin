import React from "react";
import {useCategoryList} from "../../../Hooks/category/use-category-list";
import {ContentContainerInner, MoreIcon, TableLink} from "../../GlobalStyles";
import Table from '../../Table'
import {useSelector} from "react-redux";
import DeleteIcon from "mdi-react/DeleteIcon";
import PencilIcon from "mdi-react/PencilIcon";
import {useHistory} from 'react-router-dom'
import Popover from '../../Popover'
import moment from "moment";
import {ROUTE_URL} from "../../../Constants/url";

export default () => {
  const {removeItem} =  useCategoryList()
  const {push} = useHistory()
  const category = useSelector(({category}) => category)

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
      title: 'Kategoriya nomi(uz)',
      key: 'nameuz',
      render: (nameuz, {_id}) => (<TableLink to={`${ROUTE_URL.CATEGORY.EDIT}/${_id}`}>{nameuz}</TableLink>)
    },
    {
      title: 'Kategoriya nomi(ru)',
      key: 'nameru',
      render: (nameru, {_id}) => (<TableLink to={`${ROUTE_URL.CATEGORY.EDIT}/${_id}`}>{nameru}</TableLink>)
    },
    {
      title: 'Yaratilgan sana',
      key: 'createdAt',
      render: (createdAt, {_id}) => (<TableLink to={`${ROUTE_URL.CATEGORY.EDIT}/${_id}`}>
        {moment(createdAt).format("YYYY-MM-DD")}
      </TableLink>)
    },
    {
      title: '',
      render: (props, {_id}) => (<Popover popoverData={popoverData} itemId={_id}><MoreIcon /></Popover>)
    }
  ]

  return (
    <ContentContainerInner>
      <Table
        columns={columns}
        dataSource={category.data}
        loading={category.loading}
      />
    </ContentContainerInner>
  )
}