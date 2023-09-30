'use client'
import React, { useState } from 'react'
import BarcodeReader from '../components/BarcodeReader/BarcodeReader'
import Loader from '../components/Loader/Loader'
import { useRouter } from 'next/navigation'
import {Overlay, Wrapper} from "@/app/scan/scan.styles";
import {Calendar} from "react-calendar";

export default function BarcodeReaderComponent(props: any) {
    const [loading, setLoading] = useState(false)
    const [isCalendarOpen, setIsCalendarOpen] = useState(true)
    const router = useRouter()

    const handleLoading = (value: boolean) => {
        setLoading(value)
        setTimeout(() => {
            setLoading(false)
            router.push('/')
        })
    }

    return (
        <Wrapper>
            <BarcodeReader
                isLoading={(value: boolean) => {
                    handleLoading(value)
                }}
            />
            <Overlay />
            {loading ? <Loader /> : ''}
            {isCalendarOpen ? <Calendar /> : ''}
        </Wrapper>
    )
}
