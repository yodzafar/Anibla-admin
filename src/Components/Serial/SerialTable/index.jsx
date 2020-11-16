import React from 'react'
import {useSelector} from 'react-redux'
import {useProductList} from '../../../Hooks/product'
import {ProductTable} from '../../Product'
import TrailerForm from '../SerialForm'

export default () => {
    const {removeItem, addToSlider} = useProductList({type: 'serial'})
    const product = useSelector(({product}) => product)
    return (
        <ProductTable
            data={product.data}
            loading={product.loading}
            type="serial"
            Form={TrailerForm}
            formMaxWidth="md"
            removeItem={removeItem}
            addToSlider={addToSlider}
        />
    )
}
