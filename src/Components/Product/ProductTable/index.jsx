import React from 'react';
import { useDispatch } from 'react-redux';
import DeleteIcon from 'mdi-react/DeleteIcon';
import PencilIcon from 'mdi-react/PencilIcon';
import SettingsIcon from 'mdi-react/SettingsIcon';
import { ContentContainerInner, MoreIcon, TableLink } from '../../GlobalStyles';
import Table from '../../Table'
import Popover from '../../Popover'
import { showModal } from '../../../Models/site';

const nameType = {
  film: {
    name: 'Film nomi'
  },
  Serial: {
    name: 'Serial nomi'
  },
  Treyler: {
    name: 'Treyler nomi'
  }
}

export default (props) => {
  const dispatch = useDispatch()
  const {
    removeItem,
    data,
    loading,
    Form,
    type
  } = props

  const renderModal = (id) => ({
    open: true,
    component: <Form id={id} />,
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
    // {
    //   icon: <SettingsIcon />,
    //   title: '',
    //   render: (props, { _id }) => (
    //     <Popover popoverData={popoverData} itemId={_id}>
    //       <MoreIcon />
    //     </Popover>
    //   ),
    //   width: '1%'
    // }
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
