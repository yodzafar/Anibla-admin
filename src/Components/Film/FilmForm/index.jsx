/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { useProductForm } from '../../../Hooks/product';
import { ProductForm } from '../../Product';

export default ({ maxWidth }) => {
  const productHook = useProductForm({ type: 'film' })

  return (
    <ProductForm
      {...productHook}
      maxWidth={maxWidth}
    />
  )
}
