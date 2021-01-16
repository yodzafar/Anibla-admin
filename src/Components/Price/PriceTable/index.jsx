import React from 'react'
import {usePriceList} from "../../../Hooks/price";
import {useDispatch, useSelector} from 'react-redux';
import DeleteIcon from 'mdi-react/DeleteIcon';
import PencilIcon from 'mdi-react/PencilIcon';
import moment from 'moment';
import SettingsIcon from 'mdi-react/SettingsIcon';
import {ContentContainerInner, MoreIcon, TableLink} from '../../GlobalStyles';
import Table from '../../Table'
import Popover from '../../Popover'
import {ROUTE_URL} from '../../../Constants/url';
import PriceForm from '../PriceForm'
import {showModal} from '../../../Models/app';
import {ConfirmBody} from '../../ConfirmModalBody';

export default () => {
    const {removeItem} = usePriceList()
    const price = useSelector(({price}) => price)
    const dispatch = useDispatch()

    const renderModal = (id) => ({
        open: true,
        component: <PriceForm id={id}/>,
        props: null
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
            title: "To'lov nomi",
            key: 'name',
            render: (nameuz) => (<TableLink>{nameuz}</TableLink>)
        },
        {
            title: "To'lov qiymati",
            key: 'amount',
            render: (amount) => (<TableLink>{amount} so'm</TableLink>)
        },
        {
            title: "To'lov muddati",
            key: 'type',
            render: (type) => (<TableLink>{type === '10' ? '1 yillik' : `${type} oylik`}</TableLink>)
        },
        {
            title: 'Yaratilgan sana',
            key: 'createdAt',
            render: (createdAt, {_id}) => (
                <TableLink to={`${ROUTE_URL.CATEGORY.EDIT}/${_id}`}>
                    {moment(createdAt).format('YYYY-MM-DD HH:mm')}
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
                dataSource={price.data}
                loading={price.loading}
            />
        </ContentContainerInner>
    )
}

