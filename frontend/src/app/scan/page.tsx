'use client'
import BarcodeReader from './BarcodeReader'
import { Overlay, Wrapper } from './BarcodeReader.styles'
import React from 'react'
export default function BarcodeReaderComponent (props: any): React.ReactElement {
  return (
      <>
      <Wrapper>
        <BarcodeReader />
        <Overlay />
      </Wrapper>
      </>
  )
}
