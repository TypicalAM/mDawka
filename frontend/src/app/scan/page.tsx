'use client'
import React, { useState } from 'react'
import BarcodeReader from '../components/BarcodeReader/BarcodeReader'
import Loader from '../components/Loader/Loader'
import { useRouter } from 'next/navigation'
import { Overlay, Wrapper } from './scan.styles'
import Confirm from '../components/Confirm/Confirm'

export default function BarcodeReaderComponent(props: any) {
    const [loading, setLoading] = useState(false)
    const [isCalendarOpen, setIsCalendarOpen] = useState(true)
    const router = useRouter()

    return (
        <Wrapper>
            <BarcodeReader isLoading={(value: boolean) => setLoading(value)} />
            <Overlay />
            {loading ? <Loader /> : ''}
        </Wrapper>
    )
}
