"use client"
import Image from 'next/image'
import styles from '../page.module.css'
import { useState } from 'react';
import BarcodeReader from './BarcodeReader';
import { Overlay, Wrapper } from './BarcodeReader.styles';
export default function BarcodeReaderComponent(props: any) {
    return (
      <>
      <Wrapper>
        <BarcodeReader />
        <Overlay />
      </Wrapper>
      </>
    );
}
