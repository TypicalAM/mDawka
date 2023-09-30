import React from 'react'
import Image from 'next/image'
import myGif from '../../../public/pill.gif'
import { Wrapper } from '@/app/scan/scan.styles'
import { Loader } from './Loader.styles'

export default function LoaderComponent() {
    return (
        <Loader>
            <Wrapper>
                <Image className="loader" src={myGif} width={80} alt="pill" />
            </Wrapper>
        </Loader>
    )
}
