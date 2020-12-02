import React from 'react'
import {useCommentsList} from "../../../Hooks/comments";
import {useDispatch, useSelector} from "react-redux";
import {ConfirmBody} from "../../ConfirmModalBody";
import DeleteIcon from "mdi-react/DeleteIcon";
import {showModal} from "../../../Models/app";
import {ContentContainerInner, MoreIcon, StatusBadge, TableLink} from "../../GlobalStyles";
import SettingsIcon from "mdi-react/SettingsIcon";
import Popover from "../../Popover";
import Table from "../../Table";
import moment from "moment";
import BookmarkCheckIcon from "mdi-react/BookmarkCheckIcon";

export default () => {
    const {removeItem, activeStatus} = useCommentsList()
    const dispatch = useDispatch()
    const comments = useSelector(({ comments }) => comments)

    const renderConfirmModal = (id) => ({
        open: true,
        component: <ConfirmBody maxWidth="sm" onAction={() => removeItem(id)} />,
        props: { maxWidth: 'sm' }
    })

    const popoverData = [
        {
            id: 'status',
            title: "Saytda ko'rsatish",
            icon: <BookmarkCheckIcon size={16}/>,
            onClick: (id) => activeStatus(id)
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
            title: 'Muhokama',
            key: 'message',
            render: (message) => (<TableLink>{message}</TableLink>)
        },
        {
            title: 'Foydalanuvchi',
            key: 'username',
            render: (username) => (<TableLink>{username}</TableLink>)
        },
        {
            title: 'Foydalanuvchi roli',
            key: 'role',
            render: (role) => (<TableLink>{role}</TableLink>)
        },
        {
            title: 'Yaratilgan sana',
            key: 'date',
            render: (date, { _id }) => (
                <TableLink>
                    {moment(date).format('YYYY-MM-DD HH:mm')}
                </TableLink>
            )
        },
        {
            title: 'Status',
            key: 'status',
            render: (status) => (
                <TableLink>
                    <StatusBadge status={status}>
                        {status ? 'Yoqilgan' : 'O`chirilgan'}
                    </StatusBadge>
                </TableLink>
            )
        },
        {
            icon: <SettingsIcon />,
            title: '',
            render: (props, { status, _id }) => (
                <Popover popoverData={popoverData} itemId={_id} status={status}>
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
                dataSource={comments.data}
                loading={comments.loading}
            />
        </ContentContainerInner>
    )
}