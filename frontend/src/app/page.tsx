'use client'
import Link from 'next/link'
import React from 'react'
import AnimatedLogo from '@/app/shared/AnimatedLogo/AnimatedLogo'

export default function Home(props: any): React.ReactElement {
    return (
        <>
            <AnimatedLogo />
            <h1>
                <Link href="/scan">Scan</Link>
            </h1>
        </>
    )
}
