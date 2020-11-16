import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import DeleteIcon from 'mdi-react/DeleteIcon';
import SettingsIcon from 'mdi-react/SettingsIcon';
import { ContentContainerInner, MoreIcon, TableLink } from '../../GlobalStyles';
import Popover from '../../Popover';
import Table from '../../Table';
import {useSliderList} from "../../../Hooks/slider";
import Avatar from '../../AvatarImg'
import { ConfirmBody } from '../../ConfirmModalBody';
import {showModal} from "../../../Models/app";

export default () => {
    const dispatch = useDispatch()
    const { removeItem } = useSliderList()
    const slider = useSelector(({ slider }) => slider)

    const renderConfirmModal = (id) => ({
        open: true,
        component: <ConfirmBody maxWidth="sm" onAction={() => removeItem(id)} />,
        props: { maxWidth: 'sm' }
    })

    const popoverData = [
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
            render: (nameuz, { image }) => (
                <TableLink>
                    <Avatar imgUrl={image} name={nameuz} />
                </TableLink>
            ),
            width: '1%'
        },
        {
            title: 'Mahsulot nomi',
            key: 'nameuz',
            render: (nameuz) => (<TableLink>{nameuz}</TableLink>)
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
                dataSource={slider.data}
                loading={slider.loading}
            />
        </ContentContainerInner>
    )
}
