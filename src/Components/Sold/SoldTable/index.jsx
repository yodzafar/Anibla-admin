import React from 'react';
import {useSelector } from 'react-redux';
import moment from 'moment';
import { ContentContainerInner, TableLink } from '../../GlobalStyles';
import Table from '../../Table'
import {useSoldList} from "../../../Hooks/sold/use-sold-list";

export default () => {
    useSoldList()
    const sold = useSelector(({ sold }) => sold)
    console.log(sold);
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
                dataSource={sold.data}
                loading={sold.loading}
            />
        </ContentContainerInner>
    )
}
