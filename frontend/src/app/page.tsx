'use client'
import Link from 'next/link'
import React from 'react'
import AnimatedLogo from '@/app/components/AnimatedLogo/AnimatedLogo'
import './home.css'
import SnackBar from './components/SnackBar/SnackBar'

export default function Home(props: any): React.ReactElement {
    return (
        <>
            <AnimatedLogo />
            <h1>Stwórz swój własny terminarz leków.</h1>
            <h1 className="margin-bottom">
                Wybierz opcje wprowadzenia e-skierowania.
            </h1>
            <Link href="/scan">SKANUJ E-RECEPTĘ</Link>
            <Link href="/pesel">PRZEZ PESEL</Link>
        </>
    )
}
