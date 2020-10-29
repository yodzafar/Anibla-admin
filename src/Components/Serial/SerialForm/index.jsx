/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { useProductForm } from '../../../Hooks/product';
import { ProductForm } from '../../Product';

export default ({ id, maxWidth, type }) => {
  const productHook = useProductForm({ type, id })

  return (
    <ProductForm
      {...productHook}
      maxWidth={maxWidth}
      type={type}
    />
  )
}
