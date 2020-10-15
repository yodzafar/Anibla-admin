import React, {useEffect, useRef, useState} from 'react'
import {FileInputWrapper, ShowUploadedImg, StyledFileInput, StyledFileUploadButton} from "./style";
import {StyledFormControl, StyledLabel} from "../style";
import FormHelperText from "@material-ui/core/FormHelperText";
import EyeIcon from "mdi-react/EyeIcon";
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';

export default ({error, label, value, onChange, onBlur}) => {
  const [fileName, setFileName] = useState('')
  const [imgUrl, setImgUrl] = useState(null)
  const [open, setOpen] = useState(false)
  const fileUploadInput = useRef(null)

  const handleChange = (e) => {
    const file = e.target.files[0]
    onChange(file)
    fileUploadInput.current.blur()
  }

  useEffect(() => {
    if(value) {
      setFileName(value.name)
      setImgUrl(URL.createObjectURL(value))
    }
  }, [value])

  return (
    <>
      <StyledFormControl error={!!error} variant={"outlined"}>
        <StyledLabel>{label}</StyledLabel>
        <FileInputWrapper>
          <StyledFileInput
            type="text"
            value={fileName}
            readOnly
          />
          {
            imgUrl
            && (
              <ShowUploadedImg
                onClick={() => setOpen(true)}
              >
                <EyeIcon size={18}/>
              </ShowUploadedImg>
            )
          }
          <StyledFileUploadButton
            onClick={() => fileUploadInput.current.click()}
            buttonstyle="primary"
          >
            Faylni tanlash
          </StyledFileUploadButton>
        </FileInputWrapper>
        <FormHelperText>{error}</FormHelperText>
      </StyledFormControl>
      <input
        style={{display: 'none'}}
        ref={fileUploadInput}
        readOnly
        type="file"
        onChange={handleChange}
        onBlur={onBlur}
      />
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