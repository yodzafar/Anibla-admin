import React from 'react';
import {useSelector } from 'react-redux';
import moment from 'moment';
import { ContentContainerInner, TableLink } from '../../GlobalStyles';
import Table from '../../Table'
import {usePaymentList} from "../../../Hooks/payment";

export default () => {
    usePaymentList()
    const payment = useSelector(({ payment }) => payment)

    console.log(payment);

    const columns = [
        {
            title: 'Foydalanuvchi ID',
            key: 'userID',
            render: (userID) => (<TableLink>{userID}</TableLink>)
        },
        {
            title: 'Summa',
            key: 'amount',
            render: (amount) => (<TableLink>{amount}</TableLink>)
        },
        {
            title: "To'lov turi",
            key: 'type',
            render: (type) => (<TableLink>{type}</TableLink>)
        },
        {
            title: 'Yaratilgan sana',
            key: 'date',
            render: (date) => (
                <TableLink>
                    {moment(date).format('YYYY-MM-DD HH:mm')}
                </TableLink>
            )
        },
    ]

    return (
        <ContentContainerInner>
            <Table
                columns={columns}
                dataSource={payment.data}
                loading={payment.loading}
            />
        </ContentContainerInner>
    )
}
