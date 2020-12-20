import React from 'react'
import LoaderView from 'react-loader-spinner'

export const Loader = () => {
    return (
        <LoaderView
            type="Oval"
            color="#6A2FE3"
            height={50}
            width={50}
            timeout={5000} //3 secs
        />
    )
}