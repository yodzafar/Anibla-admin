import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import DeleteIcon from 'mdi-react/DeleteIcon';
import SettingsIcon from 'mdi-react/SettingsIcon';
import { ContentContainerInner, MoreIcon, TableLink } from '../../GlobalStyles';
import Popover from '../../Popover';
import Table from '../../Table';
import { ConfirmBody } from '../../ConfirmModalBody';
import {showModal} from "../../../Models/app";
import {useNewsList} from "../../../Hooks/news/use-news-list";
import moment from "moment";

export default () => {
    const dispatch = useDispatch()
    const { removeItem } = useNewsList()
    const news = useSelector(({ news }) => news)

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
            title: 'Yangiliklar nomi (uz)',
            key: 'nameuz',
            render: (nameuz) => (<TableLink>{nameuz}</TableLink>)
        },
        {
            title: 'Yangiliklar nomi (ru)',
            key: 'nameru',
            render: (nameru) => (<TableLink>{nameru}</TableLink>)
        },
        {
            title: 'Yaratilgan sana',
            key: 'date',
            render: (date) => (<TableLink>{moment(date).format('YYYY-MM-DD HH:mm')}</TableLink>)
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
                dataSource={news.data}
                loading={news.loading}
            />
        </ContentContainerInner>
    )
}
