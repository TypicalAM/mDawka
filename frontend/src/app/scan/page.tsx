'use client'
import { useState } from 'react'
import BarcodeReader from './BarcodeReader'
import { Overlay, Wrapper } from './BarcodeReader.styles'
import Loader from './Loader'
export default function BarcodeReaderComponent (props: any) {
    const [loading, setLoading] = useState(false)

  return (
        <Wrapper>
            <BarcodeReader isLoading={(value: boolean) => { setLoading(value) }} />
            <Overlay />
            {loading ? <Loader /> : ''}
        </Wrapper>
    )
}
