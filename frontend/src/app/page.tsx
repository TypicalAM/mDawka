"use client"
import Image from 'next/image'
import { useState } from 'react';
import BarcodeReader from './scan/BarcodeReader';
import Link from 'next/link';

export default function Home(props: any) {
    return (
      <>
        <h1><Link href='/scan'>Scan</Link></h1>
      </>
    );
}
