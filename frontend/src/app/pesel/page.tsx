'use client'
import React from 'react'
import AnimatedLogo from '@/app/components/AnimatedLogo/AnimatedLogo'

export default function Home(props: any): React.ReactElement {
    return (
        <>
            <AnimatedLogo/>
            <h1>Podaj pesel oraz kod recepty</h1>
            <button onClick={buttonHandler}>Stwórz terminarz</button>
        </>
    )
}

function buttonHandler() {
    console.log("Button clicked");
}
