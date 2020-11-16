import React from 'react'
import {useSelector} from 'react-redux'
import {useProductList} from '../../../Hooks/product'
import {ProductTable} from '../../Product'
import TrailerForm from '../TrailerForm'

export default () => {
    const {removeItem, addToSlider} = useProductList({type: 'treyler'})
    const product = useSelector(({product}) => product)
    return (
        <ProductTable
            data={product.data}
            loading={product.loading}
            type="treyler"
            Form={TrailerForm}
            formMaxWidth="md"
            removeItem={removeItem}
            addToSlider={addToSlider}
        />
    )
}
