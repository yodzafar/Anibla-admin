import React from 'react'
import SettingsIcon from 'mdi-react/SettingsIcon'
import {useDispatch, useSelector} from 'react-redux'
import PencilIcon from 'mdi-react/PencilIcon'
import DeleteIcon from 'mdi-react/DeleteIcon'
import {ContentContainerInner, MoreIcon, ShowVideo, TableLink} from '../../GlobalStyles'
import Table from '../../Table'
import Popover from '../../Popover'
import {ConfirmBody} from '../../ConfirmModalBody'
import {showModal} from '../../../Models/app'
import {useSeriesList} from '../../../Hooks/product'
import SeriesForm from '../SeriesForm'
import moment from "moment";
import {VideoPreview} from "../../VideoPreview";
import VideoIcon from "mdi-react/VideoIcon";

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

    const renderVideo = (video, title) => ({
        open: true,
        component: <VideoPreview title={title} maxWidth={'md'} src={video}/>,
        props: {maxWidth: 'md'}
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
            title: 'Video',
            key: 'video',
            render: (video, {nameuz}) => (<TableLink>
                <ShowVideo onClick={() => dispatch(showModal(renderVideo(video, nameuz)))}>
                    <VideoIcon size={48} />
                </ShowVideo>
            </TableLink>),
            width: '1%'
        },
        {
            title: 'Seriya nomi(uz)',
            key: 'nameuz',
            render: (nameuz) => (<TableLink>{nameuz}</TableLink>)
        },
        {
            title: 'Seriya nomi(ru)',
            key: 'nameru',
            render: (nameru) => (<TableLink>{nameru}</TableLink>)
        },
        {
            title: 'Davomiyligi',
            key: 'length',
            render: (num) => (<TableLink>{num}</TableLink>)
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
