import React from 'react'
import { useSelector } from 'react-redux'
import { useProductList } from '../../../Hooks/product'
import { ProductTable } from '../../Product'

export default () => {
  useProductList()
  const product = useSelector(({ product }) => product)
  return (
    <ProductTable
      data={product.data}
      loading={product.loading}
      type="film"
    />
  )
}
