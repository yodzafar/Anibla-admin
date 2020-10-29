import React from 'react';
import { useDispatch } from 'react-redux';
import DeleteIcon from 'mdi-react/DeleteIcon';
import PencilIcon from 'mdi-react/PencilIcon';
import SettingsIcon from 'mdi-react/SettingsIcon';
import { ContentContainerInner, MoreIcon, TableLink } from '../../GlobalStyles';
import Table from '../../Table'
import Popover from '../../Popover'
import { showModal } from '../../../Models/site';
import { ConfirmBody } from '../../ConfirmModalBody';
import Avatar from '../../AvatarImg'

const nameType = {
  film: {
    name: 'Film nomi'
  },
  serial: {
    name: 'Serial nomi'
  },
  treyler: {
    name: 'Treyler nomi'
  }
}

const baseUrl = process.env.REACT_APP_BASE_URL

export default (props) => {
  const dispatch = useDispatch()
  const {
    removeItem,
    data,
    loading,
    Form,
    type,
    formMaxWidth
  } = props

  const renderModal = (id) => ({
    open: true,
    component: <Form id={id} maxWidth={formMaxWidth} type={type} />,
    props: { maxWidth: formMaxWidth }
  })

  const renderConfirmModal = (id) => ({
    open: true,
    component: <ConfirmBody maxWidth="sm" onAction={() => removeItem(id)} />,
    props: { maxWidth: 'sm' }
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
      onClick: (id) => dispatch(showModal(renderConfirmModal(id)))
    }
  ]

  const columns = [
    {
      title: 'Rasm',
      key: 'image',
      render: (image, { nameuz }) => (
        <TableLink>
          <Avatar imgUrl={`${baseUrl}/${image}`} name={nameuz} />
        </TableLink>
      ),
      width: '1%'
    },
    {
      title: `${nameType[type].name} (uz)`,
      key: 'nameuz',
      render: (nameuz) => (<TableLink>{nameuz}</TableLink>)
    },
    {
      title: `${nameType[type].name} (ru)`,
      key: 'nameru',
      render: (nameru) => (<TableLink>{nameru}</TableLink>)
    },
    {
      title: 'Kategoriya',
      key: 'category',
      render: (category) => (<TableLink>{category}</TableLink>)
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
        dataSource={data}
        loading={loading}
      />
    </ContentContainerInner>
  )
}
