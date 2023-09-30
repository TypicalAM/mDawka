import React, { useEffect, useRef, useState } from 'react'
// eslint-disable-next-line
// @ts-ignore
import Quagga from 'quagga'
import { BarcodeFormat, type CodeResult } from '../../../types/BarcodeTypes'

interface Props {
    isLoading: Function
}

export default function BarcodeReader({ isLoading }: Props) {
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
        Quagga.onDetected((processed: any) => {
            const codeResult: CodeResult = processed.codeResult
            console.log(codeResult)
            if (codeResult) {
                isLoading(true)
            }
        })
        setReader(readerConf)
    }, [])

    return <div className="scanner" ref={myRef}></div>
}
