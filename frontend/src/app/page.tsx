"use client"
import Image from 'next/image'
import styles from './page.module.css'
import { useState } from 'react';
import BarcodeReader from './components/BarcodeReader';

export default function Home(props: any) {
    const [data, setData] = useState('No result');

    return (
      <>
        <BarcodeReader></BarcodeReader>
      </>
    );
}
