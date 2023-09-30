'use client'
import React from 'react'
import AnimatedLogo from '@/app/components/AnimatedLogo/AnimatedLogo'
import Input from "@/app/components/Input/Input";
import "./pesel.css"

export default function Home(props: any): React.ReactElement {
    return (
        <>
            <AnimatedLogo/>
            <h1>Podaj pesel oraz kod recepty</h1>
            <div className="height">
                <Input placeholder="PESEL" onChange={() => {
                }}/>
            </div>
            <div className="height">
                <Input placeholder="PIN" onChange={() => {
                }}/>
            </div>
            <button className="button" onClick={buttonHandler}>STWÓRZ TERMINARZ</button>
        </>
    )
}

function buttonHandler() {
    console.log("Button clicked");
}
