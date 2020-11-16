import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import DeleteIcon from 'mdi-react/DeleteIcon';
import moment from 'moment';
import SettingsIcon from 'mdi-react/SettingsIcon';
import {ContentContainerInner, MoreIcon, StatusBadge, TableLink} from '../../GlobalStyles';
import Table from '../../Table'
import Popover from '../../Popover'
import {ROUTE_URL} from '../../../Constants/url';
import {showModal} from '../../../Models/app';
import {ConfirmBody} from '../../ConfirmModalBody';
import {useAnnotationList} from "../../../Hooks/annotation";
import BookmarkCheckIcon from "mdi-react/BookmarkCheckIcon";

export default () => {
    const {removeItem, activeStatus} = useAnnotationList()
    const annotation = useSelector(({annotation}) => annotation)
    const dispatch = useDispatch()

    const renderConfirmModal = (id) => ({
        open: true,
        component: <ConfirmBody maxWidth="sm" onAction={() => removeItem(id)}/>,
        props: {maxWidth: 'sm'}
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
            icon: <DeleteIcon size={16}/>,
            onClick: (id) => dispatch(showModal(renderConfirmModal(id)))
        }
    ]

    const columns = [
        {
            title: 'Annotatsiya nomi(uz)',
            key: 'nameuz',
            render: (nameuz) => (<TableLink>{nameuz}</TableLink>)
        },
        {
            title: 'Annotatsiya nomi(ru)',
            key: 'nameru',
            render: (nameru) => (<TableLink>{nameru}</TableLink>)
        },
        {
            title: 'Yaratilgan sana',
            key: 'date',
            render: (date, {_id}) => (
                <TableLink to={`${ROUTE_URL.CATEGORY.EDIT}/${_id}`}>
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
            icon: <SettingsIcon/>,
            title: '',
            render: (props, {_id, status}) => (
                <Popover status={status} popoverData={popoverData} itemId={_id}>
                    <MoreIcon/>
                </Popover>
            ),
            width: '1%'
        }
    ]

    return (
        <ContentContainerInner>
            <Table
                columns={columns}
                dataSource={annotation.data}
                loading={annotation.loading}
            />
        </ContentContainerInner>
    )
}
