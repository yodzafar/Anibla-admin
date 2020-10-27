import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DeleteIcon from 'mdi-react/DeleteIcon';
import PencilIcon from 'mdi-react/PencilIcon';
import moment from 'moment';
import SettingsIcon from 'mdi-react/SettingsIcon';
import { useCategoryList } from '../../../Hooks/category';
import { ContentContainerInner, MoreIcon, TableLink } from '../../GlobalStyles';
import Table from '../../Table'
import Popover from '../../Popover'
import { ROUTE_URL } from '../../../Constants/url';
import { CategoryForm } from '../index';
import { showModal } from '../../../Models/site';

export default () => {
  const { removeItem } = useCategoryList()
  const category = useSelector(({ category }) => category)
  const dispatch = useDispatch()

  const renderModal = (id) => ({
    open: true,
    component: <CategoryForm id={id} />,
    props: null
  })

  const popoverData = [
    {
      id: 'edit',
      title: 'Tahrirlash',
      icon: <PencilIcon size={16} />,
      onClick: (id) => dispatch(showModal(renderModal(id)))
    },
    {
      id: 'delete',
      title: "O'chirish",
      icon: <DeleteIcon size={16} />,
      onClick: (id) => removeItem(id)
    }
  ]

  const columns = [
    {
      title: 'Kategoriya nomi(uz)',
      key: 'nameuz',
      render: (nameuz) => (<TableLink>{nameuz}</TableLink>)
    },
    {
      title: 'Kategoriya nomi(ru)',
      key: 'nameru',
      render: (nameru) => (<TableLink>{nameru}</TableLink>)
    },
    {
      title: 'Yaratilgan sana',
      key: 'createdAt',
      render: (createdAt, { _id }) => (
        <TableLink to={`${ROUTE_URL.CATEGORY.EDIT}/${_id}`}>
          {moment(createdAt).format('YYYY-MM-DD HH:mm')}
        </TableLink>
      )
    },
    {
      icon: <SettingsIcon />,
      title: '',
      render: (props, { _id }) => (
        <Popover popoverData={popoverData} itemId={_id}>
          <MoreIcon />
        </Popover>
      ),
      width: '1%'
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
