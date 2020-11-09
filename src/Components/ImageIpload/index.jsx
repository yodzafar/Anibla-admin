/* eslint-disable no-plusplus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/button-has-type */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from 'react'
import ImageUploading from 'react-images-uploading';
import CloudUploadOutlineIcon from 'mdi-react/CloudUploadOutlineIcon'
import TrashCanOutlineIcon from 'mdi-react/TrashCanOutlineIcon'
import CursorMoveIcon from 'mdi-react/CursorMoveIcon'
import {
  ImageItem,
  ImageItemAction,
  ImageUploadInner,
  ImageUploadText,
  ImageUploadWrapper,
  ImageWrapper
} from './style';

export default ({ onChange, value }) => {
  const [images, setImages] = useState([]);
  const maxNumber = 12;
  const handleChange = (imageList) => {
    const data = []
    for (let i = 0; i < imageList.length; i++) {
      data.push(imageList[i].file)
    }
    onChange(data)
    setImages(imageList);
  };

  useEffect(() => {
    if (value && value.length > 0) {
      const tmp = []
      for (let i = 0; i < value.length; i++) {
        if (typeof value[i] === 'string') {
          tmp.push({ data_url: value[i] })
        }
      }

      if (tmp.length > 0) {
        setImages(tmp)
      }
    } else {
      setImages([])
    }
  }, [value])

  return (
    <ImageUploading
      multiple
      value={images}
      onChange={handleChange}
      maxNumber={maxNumber}
      dataURLKey="data_url"
    >
      {({
        imageList,
        onImageUpload,
        onImageUpdate,
        onImageRemove,
        isDragging,
        dragProps
      }) => (
          <>
            <ImageUploadWrapper
              onClick={onImageUpload}
              isDragging={isDragging}
              {...dragProps}
            >
              <ImageUploadInner>
                <CloudUploadOutlineIcon size={48} />
                <ImageUploadText>
                  Rasmni belgilangan sohaga joylang yoki ushbu sohaga bosing tugmasini bosing
                </ImageUploadText>
              </ImageUploadInner>
            </ImageUploadWrapper>
            <ImageWrapper>
              {imageList.map((image, idx) => (
                <ImageItem
                  key={`${idx + 1}`}
                  imgUrl={image.data_url}
                >
                  <ImageItemAction>
                    <div onClick={() => onImageUpdate(idx)}><CursorMoveIcon size={18} /></div>
                    <div onClick={() => onImageRemove(idx)}><TrashCanOutlineIcon size={18} /></div>
                  </ImageItemAction>
                </ImageItem>
              ))}
            </ImageWrapper>
          </>
        )}
    </ImageUploading>
  );
}
