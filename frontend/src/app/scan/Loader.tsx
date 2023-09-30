import React from 'react'
import Image from 'next/image'
import myGif from '../../../public/pill.gif'
import { Loader, Wrapper } from './BarcodeReader.styles'
export default function LoaderComponent() {
    return (
        <Loader>
            <Wrapper>
                <Image className="loader" src={myGif} width={80} alt="pill" />
            </Wrapper>
        </Loader>
    )
}
