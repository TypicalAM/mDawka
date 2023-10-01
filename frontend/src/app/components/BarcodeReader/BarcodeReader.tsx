import React, { useEffect, useRef, useState } from 'react'
// eslint-disable-next-line
// @ts-ignore
import Quagga from 'quagga'
import { BarcodeFormat, type CodeResult } from '../../../../types/BarcodeTypes'
import { useRouter } from 'next/navigation'
import { authWithBarcode, authWithPESEL } from '@/app/service/api.service'
import { saveBody } from '@/app/service/storage.service'

interface Props {
    isLoading: Function
}

export default function BarcodeReader({ isLoading }: Props) {
    const router = useRouter()
    const myRef = useRef(null)
    const [reader, setReader] = useState()

    useEffect(() => {
        if (!myRef) {
            return
        }
        const readerConf = Quagga.init(
            {
                drawBoundingBox: true,
                locate: true,
                inputStream: {
                    name: 'Live',
                    type: 'LiveStream',
                    target: myRef.current,
                },
                decoder: {
                    readers: [BarcodeFormat.EAN_READER],
                },
            },
            function (err: any) {
                if (err) {
                    console.log(err)
                    return
                }
                console.log('Initialization finished. Ready to start')
                Quagga.start()
            }
        )
        Quagga.onDetected(async (processed: any) => {
            const codeResult: CodeResult = processed.codeResult
            if (codeResult) {
                isLoading(true)
                try {
                    const response = await authWithPESEL('91032278965', '1234')
                    const result = await response.json()
                    saveBody(result)
                    Quagga.stop()
                    router.replace('/accept')
                } catch (e) {
                    throw e
                }
            }
        })
        setReader(readerConf)
    }, [])

    return <div className="scanner" ref={myRef}></div>
}
