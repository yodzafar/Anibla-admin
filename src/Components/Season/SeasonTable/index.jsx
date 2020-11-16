import React from 'react'
import SettingsIcon from 'mdi-react/SettingsIcon'
import { useDispatch, useSelector } from 'react-redux'
import PencilIcon from 'mdi-react/PencilIcon'
import DeleteIcon from 'mdi-react/DeleteIcon'
import { useHistory } from 'react-router-dom'
import { BASE_URL, ROUTE_URL } from '../../../Constants/url'
import { ContentContainerInner, MoreIcon, TableLink } from '../../GlobalStyles'
import Table from '../../Table'
import Popover from '../../Popover'
import { ConfirmBody } from '../../ConfirmModalBody'
import { showModal } from '../../../Models/app'
import AvatarImg from '../../AvatarImg'
import { useSeasonList } from '../../../Hooks/product'
import SeasonForm from '../SeasonForm'

export default ({ filmId }) => {
    const { push } = useHistory()
    const { removeItem } = useSeasonList({ filmId })
    const product = useSelector(({ product }) => product)
    const dispatch = useDispatch()
    const renderModal = (id) => ({
        open: true,
        component: <SeasonForm id={id} maxWidth="md" filmId={filmId} />,
        props: { maxWidth: 'md' }
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
            render: (image, { nameuz, _id }) => (
                <TableLink link onClick={() => push(`${ROUTE_URL.SEASON.LIST}/${filmId}/seriya/${_id}`)}>
                    <AvatarImg imgUrl={`${BASE_URL}/${image}`} name={nameuz} />
                </TableLink>
            ),
            width: '1%'
        },
        {
            title: 'Sezon nomi(uz)',
            key: 'nameuz',
            render: (nameuz, { _id }) => (<TableLink link onClick={() => push(`${ROUTE_URL.SEASON.LIST}/${filmId}/seriya/${_id}`)}>{nameuz}</TableLink>)
        },
        {
            title: 'Sezon nomi(ru)',
            key: 'nameru',
            render: (nameru, { _id }) => (<TableLink link onClick={() => push(`${ROUTE_URL.SEASON.LIST}/${filmId}/seriya/${_id}`)}>{nameru}</TableLink>)
        },
        {
            title: 'Sezonlar soni',
            key: 'num',
            render: (num, { _id }) => (<TableLink link onClick={() => push(`${ROUTE_URL.SEASON.LIST}/${filmId}/seriya/${_id}`)}>{num}</TableLink>)
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
                loading={product.loading}
                dataSource={product.season}
            />
        </ContentContainerInner>
    )
}
