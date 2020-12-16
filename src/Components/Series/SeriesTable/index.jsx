import React from 'react'
import SettingsIcon from 'mdi-react/SettingsIcon'
import {useDispatch, useSelector} from 'react-redux'
import PencilIcon from 'mdi-react/PencilIcon'
import DeleteIcon from 'mdi-react/DeleteIcon'
import {ContentContainerInner, MoreIcon, TableLink} from '../../GlobalStyles'
import Table from '../../Table'
import Popover from '../../Popover'
import {ConfirmBody} from '../../ConfirmModalBody'
import {showModal} from '../../../Models/app'
import {useSeriesList} from '../../../Hooks/product'
import SeriesForm from '../SeriesForm'
import moment from "moment";

export default ({filmId}) => {
    const {removeItem} = useSeriesList({filmId})
    const product = useSelector(({product}) => product)
    const dispatch = useDispatch()
    const renderModal = (id) => ({
        open: true,
        component: <SeriesForm id={id} maxWidth="md" filmId={filmId}/>,
        props: {maxWidth: 'md'}
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
            id: 'delete',
            title: "O'chirish",
            icon: <DeleteIcon size={16}/>,
            onClick: (id) => dispatch(showModal(renderConfirmModal(id)))
        }
    ]

    const columns = [
        {
            title: 'Seriya nomi(uz)',
            key: 'nameuz',
            render: (nameuz, {_id}) => (<TableLink>{nameuz}</TableLink>)
        },
        {
            title: 'Seriya nomi(ru)',
            key: 'nameru',
            render: (nameru, {_id}) => (<TableLink>{nameru}</TableLink>)
        },
        {
            title: 'Davomiyligi',
            key: 'length',
            render: (num, {_id}) => (<TableLink>{num}</TableLink>)
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
                loading={product.loading}
                dataSource={product.series}
            />
        </ContentContainerInner>
    )
}
