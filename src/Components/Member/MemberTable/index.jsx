import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import DeleteIcon from 'mdi-react/DeleteIcon';
import moment from 'moment';
import SettingsIcon from 'mdi-react/SettingsIcon';
import { ContentContainerInner, MoreIcon, TableLink } from '../../GlobalStyles';
import Popover from '../../Popover';
import Table from '../../Table';
import { useMemberList } from '../../../Hooks/member';
import Avatar from '../../AvatarImg'
import { ConfirmBody } from '../../ConfirmModalBody';
import { showModal } from '../../../Models/app';
import PencilIcon from "mdi-react/PencilIcon";
import {MemberForm} from "../index";
import {EditAvatar} from "./EditiAvatar";
import AccountBoxIcon from "mdi-react/AccountBoxIcon";

const baseUrl = process.env.REACT_APP_BASE_URL

export default () => {
  const dispatch = useDispatch()
  const { removeItem } = useMemberList()
  const member = useSelector(({ member }) => member)

  const renderConfirmModal = (id) => ({
    open: true,
    component: <ConfirmBody maxWidth="sm" onAction={() => removeItem(id)} />,
    props: { maxWidth: 'sm' }
  })

  const renderModal = (id) => ({
    open: true,
    component: <MemberForm id={id} />,
    props: null
  })

  const renderEditAvatarModal = (id) => ({
    open: true,
    component: <EditAvatar id={id} />,
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
      id: 'editAvatar',
      title: 'Avatarni almashtirish',
      icon: <AccountBoxIcon size={16} />,
      onClick: (id) => dispatch(showModal(renderEditAvatarModal(id)))
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
      render: (nameuz, { image, name }) => (
        <TableLink>
          <Avatar imgUrl={`${baseUrl}${image}`} name={name} />
        </TableLink>
      ),
      width: '1%'
    },
    {
      title: 'Ishtirokchi FISH',
      key: 'name',
      render: (nameuz) => (<TableLink>{nameuz}</TableLink>)
    },
    {
      title: 'Yaratilgan sana',
      key: 'createdAt',
      render: (createdAt) => (<TableLink>{moment(createdAt).format('YYYY-MM-DD HH:mm')}</TableLink>)
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

  // const columns = [
  //   { field: 'id', headerName: 'ID', width: 70 },
  //   { field: 'firstName', headerName: 'First name', width: 130 },
  //   { field: 'lastName', headerName: 'Last name', width: 130 },
  //   {
  //     field: 'age',
  //     headerName: 'Age',
  //     type: 'number',
  //     width: 90,
  //   },
  //   {
  //     field: 'fullName',
  //     headerName: 'Full name',
  //     description: 'This column has a value getter and is not sortable.',
  //     sortable: false,
  //     width: 160,
  //     valueGetter: (params) => {
  //       console.log(params);
  //       return `${params.getValue('firstName') || ''} ${params.getValue('lastName') || ''}`
  //     }
  //   },
  // ];

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
