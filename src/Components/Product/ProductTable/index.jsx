import React from 'react';
import Table from '../../Table'
import Popover from '../../Popover'
import Avatar from '../../AvatarImg'
import {useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';
import DeleteIcon from 'mdi-react/DeleteIcon';
import PencilIcon from 'mdi-react/PencilIcon';
import {showModal} from '../../../Models/app';
import SettingsIcon from 'mdi-react/SettingsIcon';
import {ROUTE_URL} from '../../../Constants/url';
import {ConfirmBody} from '../../ConfirmModalBody';
import {ContentContainerInner, MoreIcon, TableLink} from '../../GlobalStyles';
import ImagesIcon from "mdi-react/ImagesIcon"

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
    const {push} = useHistory()
    const dispatch = useDispatch()
    const {
        removeItem,
        data,
        loading,
        Form,
        type,
        formMaxWidth,
        addToSlider
    } = props

    const renderModal = (id) => ({
        open: true,
        component: <Form id={id} maxWidth={formMaxWidth} type={type}/>,
        props: {maxWidth: formMaxWidth}
    })

    const renderConfirmModal = (id) => ({
        open: true,
        component: <ConfirmBody maxWidth="sm" onAction={() => removeItem(id)}/>,
        props: {maxWidth: 'sm'}
    })

    const popoverData = [
        {
            id: 'edit',
            title: 'Tahrirlash',
            icon: <PencilIcon size={16}/>,
            onClick: (id) => dispatch(showModal(renderModal(id)))
        },
        {
            id: 'add_to_slider',
            title: 'Sliderga qo\'shih',
            icon: <ImagesIcon size={16}/>,
            onClick: (id) => addToSlider(id)
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
            title: 'Rasm',
            key: 'image',
            render: (image, {nameuz, _id}) => (
                <TableLink
                    link={type === 'serial'}
                    onClick={() => type === 'serial' && push(`${ROUTE_URL.SEASON.LIST}/${_id}`)}
                >
                    <Avatar imgUrl={`${baseUrl}/${image}`} name={nameuz}/>
                </TableLink>
            ),
            width: '1%'
        },
        {
            title: `${nameType[type].name} (uz)`,
            key: 'nameuz',
            render: (nameuz, {_id}) => (
                <TableLink
                    link={type === 'serial'}
                    onClick={() => type === 'serial' && push(`${ROUTE_URL.SEASON.LIST}/${_id}`)}
                >
                    {nameuz}
                </TableLink>
            )
        },
        {
            title: `${nameType[type].name} (ru)`,
            key: 'nameru',
            render: (nameru, {_id}) => (
                <TableLink
                    link={type === 'serial'}
                    onClick={() => type === 'serial' && push(`${ROUTE_URL.SEASON.LIST}/${_id}`)}
                >
                    {nameru}
                </TableLink>
            )
        },
        {
            title: 'Kategoriya',
            key: 'category',
            render: (category, {_id}) => (
                <TableLink
                    link={type === 'serial'}
                    onClick={() => type === 'serial' && push(`${ROUTE_URL.SEASON.LIST}/${_id}`)}
                >
                    {category}
                </TableLink>
            )
        },
        {
            icon: <SettingsIcon/>,
            title: '',
            render: (props, {_id}) => (
                <Popover popoverData={popoverData} itemId={_id}>
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
                dataSource={data}
                loading={loading}
            />
        </ContentContainerInner>
    )
}
