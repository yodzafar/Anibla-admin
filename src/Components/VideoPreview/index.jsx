import React, {useRef, useState} from 'react'
import {VideoPreviewContainer} from "./style";
import {Form} from "../Form";
import {Loader} from "../Loader";

export const VideoPreview = ({src, title, maxWidth}) => {
    const iframeRef = useRef(null)
    const [loading, setLoading] = useState(true)

    const onLoad = () => {
        setLoading(false)
    }

    return (
        <Form title={title} maxWidth={maxWidth}>
            <VideoPreviewContainer>
                {
                    loading && <Loader />
                }
                <iframe
                    ref={iframeRef}
                    title='VideoPreview'
                    src={src}
                    frameBorder="0"
                    allowFullScreen
                    onLoad={onLoad}
                    height={!loading ? 400 : 0}
                />
            </VideoPreviewContainer>
        </Form>
    )
}