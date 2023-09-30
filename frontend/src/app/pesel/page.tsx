'use client'
import React from 'react'
import AnimatedLogo from '@/app/components/AnimatedLogo/AnimatedLogo'
import Input from "@/app/components/Input/Input";
import "./pesel.css"

export default function Home(props: any): React.ReactElement {
    const [pesel, setPesel] = React.useState("")
    const [pin, setPin] = React.useState("")
    function buttonDisableCheck(): boolean {
        return !(pesel.length === 11 && pin.length === 4)
    }

    return (
        <>
            <AnimatedLogo/>
            <h1>Podaj pesel oraz kod recepty</h1>
            <div className="height">
                <Input placeholder="PESEL" value={pesel} onChange={(value: string) => {
                    if (value.length > 11)
                        setPesel(value.slice(0, 11))
                    else if (!isNaN(Number(value)))
                        setPesel(value)
                }
                }/>
            </div>
            <div className="height">
                <Input placeholder="PIN" type="password" value={pin} onChange={(value: string) => {
                    if (value.length > 4)
                        setPin(value.slice(0, 4))
                    else if (!isNaN(Number(value)))
                        setPin(value)
                }
                }/>
            </div>
            <button className="button" onClick={buttonHandler} disabled={buttonDisableCheck()}>STWÓRZ TERMINARZ</button>
        </>
    )

    function buttonHandler() {
        fetch("http://localhost:8080/api/pesel_code", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                pesel: pesel,
                code: pin
            })
        }).then((response) => {
            localStorage.setItem("data", (response.body || "").toString() )
        })
    }
}


