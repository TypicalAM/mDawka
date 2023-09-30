"use client"
import Image from 'next/image'
import { useState } from 'react';
import BarcodeReader from './components/BarcodeReader';
import Link from 'next/link';

export default function Home(props: any) {
    return (
      <>
        <Link href='/scan'></Link>
      </>
    );
}
