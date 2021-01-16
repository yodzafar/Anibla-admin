import React from 'react';
import {useSelector } from 'react-redux';
import moment from 'moment';
import { ContentContainerInner, TableLink } from '../../GlobalStyles';
import Table from '../../Table'
import {useSoldList} from "../../../Hooks/sold/use-sold-list";
import Avatar from "../../AvatarImg";
import {BASE_URL} from "../../../Constants/url";

export default () => {
    useSoldList()
    const sold = useSelector(({ sold }) => sold)

    const columns = [
        {
            title: 'Rasm',
            key: 'photo',
            render: (a, {user}) => (
                <TableLink>
                    <Avatar
                        imgUrl={user.photo ? `${BASE_URL}/public/uploads/avatar/${user.photo}` : undefined}
                        name={user.name}
                    />
                </TableLink>
            ),
            width: '1%'
        },
        {
            title: 'Foydalanuvchi nomi',
            key: 'user',
            render: (user) => (<TableLink>{user.name}</TableLink>)
        },
        {
            title: 'Tarif',
            key: 'price',
            render: (price) => (<TableLink>{price.type === '10' ? '1 yillik VIP' : `${price.type} oylik VIP`}</TableLink>)
        },
        {
            title: 'Yoqilgan sana',
            key: 'createdAt',
            render: (createdAt) => (
                <TableLink>
                    {moment(createdAt).format('YYYY-MM-DD HH:mm')}
                </TableLink>
            )
        },
        {
            title: 'Tugash sana',
            key: 'createdAt',
            render: (endDate) => (
                <TableLink>
                    {moment(endDate).format('YYYY-MM-DD HH:mm')}
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
