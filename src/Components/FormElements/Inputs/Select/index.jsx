import React, { useCallback } from 'react'
import { CircularProgress, FormHelperText } from '@material-ui/core'
import {
  MultipleSelectedWrap,
  OptionLoading,
  StyledChip,
  StyledFormControl,
  StyledInput,
  StyledLabel,
  StyledOptionItem,
  StyledSelect
} from '../style'
import noData from '../../../../Assets/images/no-data.png'
import Avatar from '../../../AvatarImg'

export default ({
  label, value, onChange, options, loading, error, multiple, ...props
}) => {
  const renderValue = useCallback((selected) => {
    const data = options.find((item) => item.id === selected)
    return (
      <div>
        {
          data &&  data.name
        }
      </div>
    )
  }, [options])

  const multipleRenderValue = useCallback((selected) => {
    const data = []
    for (let i = 0; i < selected.length; i++) {
      for (let j = 0; j < options.length; j++) {
        if (selected[i] === options[j].id) {
          data.push(options[j])
        }
      }
    }
    return (
      <MultipleSelectedWrap>
        {
          data.map((item) => (
            <StyledChip
              key={item.id}
              label={item.name}
            />
          ))
        }
      </MultipleSelectedWrap>
    )
  }, [options])

  return (
    <StyledFormControl variant="outlined" error={!!error}>
      <StyledLabel>{label}</StyledLabel>
      <StyledSelect
        {...props}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        input={<StyledInput />}
        multiple={multiple || false}
        renderValue={(selected) => (
          multiple ? multipleRenderValue(selected) : renderValue(selected)
        )}
        MenuProps={{
          PaperProps: {
            style: {
              maxHeight: 30 * 8 + 8,
              width: 250
            }
          }
        }}
      >
        {
          !loading && options && options.length > 0
            && options.map((option, idx) => (
              <StyledOptionItem key={`${idx + 1}`} value={option.id}>
                <div style={{ marginRight: 12 }}>
                  {
                    option.img && (<Avatar size={30} imgUrl={option.img} name={option.name} />)
                  }
                </div>
                {
                  option.name
                }
              </StyledOptionItem>
            ))
        }

        {
          (options === undefined || options.length === 0)
            && (
              <OptionLoading>
                {
                  loading && <CircularProgress size={16} />
                }
                <img src={noData} alt="noData" />
              </OptionLoading>
            )
        }
      </StyledSelect>
      <FormHelperText>{error}</FormHelperText>
    </StyledFormControl>
  )
}
