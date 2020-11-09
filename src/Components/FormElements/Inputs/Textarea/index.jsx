/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'
import { TextField } from '@material-ui/core';

export default ({
  rows, label, value, onChange, error, ...props
}) => (
  <TextField
    label={label || ''}
    multiline
    rows={rows || 4}
    value={value}
    onChange={(e) => onChange(e.target.value)}
    {...props}
    variant="outlined"
    error={!!error}
    helperText={error && error}
  />
)
