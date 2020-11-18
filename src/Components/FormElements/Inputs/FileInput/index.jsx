import React, { useEffect, useState } from 'react'
import FormHelperText from '@material-ui/core/FormHelperText';
import EyeIcon from 'mdi-react/EyeIcon';
import Lightbox from 'react-image-lightbox';
import { StyledFormControl, StyledLabel } from '../style';
import {
  FileInputWrapper, ShowUploadedImg, StyledCommonFileInput, StyledFileInput
} from './style';
import 'react-image-lightbox/style.css';

export default ({
  error, label, value, onChange, onBlur, name
}) => {
  const [fileName, setFileName] = useState('')
  const [imgUrl, setImgUrl] = useState(null)
  const [open, setOpen] = useState(false)

  const handleChange = (e) => {
    const file = e.target.files[0]
    onChange(file)
  }

  useEffect(() => {
    if (value) {
      if (typeof value === 'string' && value.match(/\w+(.)\w+$/)[0]) {
        setImgUrl(value)
        setFileName(value.match(/\w+(.)\w+$/)[0])
      } else {
        setFileName(value.name)
        setImgUrl(URL.createObjectURL(value))
      }
    } else {
      setImgUrl(false)
      setFileName('')
    }
  }, [value])

  return (
    <>
      <StyledFormControl error={!!error} variant="outlined">
        <StyledLabel bg="0">{label}</StyledLabel>
        <FileInputWrapper>
          <StyledFileInput
            type="text"
            value={fileName}
            readOnly
            disabled
          />
          {
            imgUrl
            && (
              <ShowUploadedImg
                onClick={() => setOpen(true)}
              >
                <EyeIcon size={18} />
              </ShowUploadedImg>
            )
          }

          <StyledCommonFileInput
              name={name}
              readOnly
              type="file"
              onChange={handleChange}
              onBlur={onBlur}
          />
        </FileInputWrapper>
        <FormHelperText>{error}</FormHelperText>
      </StyledFormControl>
      {
        imgUrl && open
        && (
          <Lightbox
            mainSrc={imgUrl}
            onCloseRequest={() => setOpen(false)}
          />
        )
      }
    </>
  )
}
