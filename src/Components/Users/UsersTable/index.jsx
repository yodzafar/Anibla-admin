import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DeleteIcon from 'mdi-react/DeleteIcon';
import moment from 'moment';
import SettingsIcon from 'mdi-react/SettingsIcon';
import { ContentContainerInner, MoreIcon, TableLink } from '../../GlobalStyles';
import Table from '../../Table'
import Popover from '../../Popover'
import { showModal } from '../../../Models/app';
import { ConfirmBody } from '../../ConfirmModalBody';
import {useUserList} from "../../../Hooks/users";
import UserForm from '../UserFom'
import AccountDetailsIcon from "mdi-react/AccountDetailsIcon";
import Avatar from "../../AvatarImg";
import {BASE_URL} from "../../../Constants/url";

export default () => {
    const dispatch = useDispatch()
    const {removeItem} = useUserList()
    const users = useSelector(({ users }) => users)

    const renderModal = (id, type) => ({
        open: true,
        component: <UserForm id={id} type={type} />,
        props: null
    })


    const renderConfirmModal = (id) => ({
        open: true,
        component: <ConfirmBody maxWidth="sm" onAction={() => removeItem(id)} />,
        props: { maxWidth: 'sm' }
    })

    const popoverData = [
        {
            id: 'changeRole',
            title: "Rolni o'zgartirish",
            icon: <AccountDetailsIcon size={16} />,
            onClick: (id) => dispatch(showModal(renderModal(id, 'role')))
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
            key: 'photo',
            render: (nameuz, { photo, name }) => (
                <TableLink>
                    <Avatar
                        imgUrl={photo ? `${BASE_URL}/public/uploads/avatar/${photo}` : undefined}
                        name={name}
                    />
                </TableLink>
            ),
            width: '1%'
        },
        {
            title: 'Foydalanuvchi nomi',
            key: 'name',
            render: (name) => (<TableLink>{name}</TableLink>)
        },
        {
            title: 'Email',
            key: 'email',
            render: (email) => (<TableLink>{email}</TableLink>)
        },
        {
            title: 'Roli',
            key: 'role',
            render: (role) => (<TableLink>{role}</TableLink>)
        },
        {
            title: 'Status',
            key: 'status',
            render: (status) => (<TableLink>{status === 'user' ? 'foydalanuchi' : 'VIP'}</TableLink>)
        },
        {
            title: 'Balans',
            key: 'balance',
            render: (balance) => (<TableLink>{balance}</TableLink>)
        },
        {
            title: 'Registratsiya sanasi',
            key: 'createdAt',
            render: (createdAt, { _id }) => (
                <TableLink>
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
                dataSource={users.data}
                loading={users.loading}
            />
        </ContentContainerInner>
    )
}
