import React, { useEffect, useRef, useState } from 'react'
// eslint-disable-next-line
// @ts-ignore
import Quagga from 'quagga'
import { BarcodeFormat, type CodeResult } from '../../../types/BarcodeTypes'

export default function BarcodeReader (): React.ReactElement {
  const myRef = useRef(null)
  const [, setReader] = useState()
  const width = window.innerWidth
  console.log(width)
  const height = window.innerHeight
  console.log(height)
  useEffect(() => {
    const readerConf = Quagga.init({
      drawBoundingBox: true,
      locate: true,
      inputStream: {
        name: 'Live',
        type: 'LiveStream',
        target: myRef.current,
        size: width
      },
      decoder: {
        readers: [BarcodeFormat.EAN_READER]
      }
    }, function (err: Error) {
      if (err !== null) {
        console.log(err)
        return
      }
      console.log('Initialization finished. Ready to start')
      Quagga.start()
    })
    Quagga.onDetected((processed: any) => {
      const codeResult: CodeResult = processed.codeResult
      console.log(codeResult)
      // TODO Api call with codeResult
    })

    setReader(readerConf)
  }, [])

  return (
    <div className='scanner' ref={myRef}></div>
  )
}
