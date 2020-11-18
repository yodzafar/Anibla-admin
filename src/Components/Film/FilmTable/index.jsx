import React from 'react'
import { useSelector } from 'react-redux'
import { useProductList } from '../../../Hooks/product'
import { ProductTable } from '../../Product'
import FilmForm from '../FilmForm'

export default () => {
  const { removeItem, addToSlider } = useProductList({ type: 'film' })
  const product = useSelector(({ product }) => product)

  return (
    <ProductTable
      data={product.data}
      loading={product.loading}
      type="film"
      Form={FilmForm}
      formMaxWidth="md"
      removeItem={removeItem}
      addToSlider={addToSlider}
    />
  )
}
