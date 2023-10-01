'use client'
import React from 'react'
import AnimatedLogo from '@/app/components/AnimatedLogo/AnimatedLogo'
import Input from '@/app/components/Input/Input'
import './pesel.css'
import { useRouter } from 'next/navigation'
import SnackBar from '../components/SnackBar/SnackBar'
import { authWithPESEL } from '../service/api.service'

export default function Home(props: any): React.ReactElement {
    const [pesel, setPesel] = React.useState('')
    const [pin, setPin] = React.useState('')
    const router = useRouter()
    const [message, setMessage] = React.useState('')
    const [isVisible, setIsVisible] = React.useState(false)

    function buttonDisableCheck(): boolean {
        return !(pesel.length === 11 && pin.length === 4)
    }

    async function buttonHandler() {
        try {
            const response = await authWithPESEL(pesel, pin)
            if (response.status !== 200)
                throw new Error('Niepoprawny PESEL lub PIN')
            const result = await response.json()
            localStorage.setItem('data', JSON.stringify(result))
            router.replace('/accept')
        } catch (e: any) {
            setIsVisible(true)
            setMessage(e.message)
            setTimeout(() => setIsVisible(false), 3000)
        }
    }

    return (
        <section id="Widok PESEL">
            <AnimatedLogo />
            <h1>Podaj pesel oraz kod recepty</h1>
            <div className="height">
                <Input
                    placeholder="PESEL"
                    value={pesel}
                    onChange={(value: string) => {
                        if (value.length > 11) setPesel(value.slice(0, 11))
                        else if (!isNaN(Number(value))) setPesel(value)
                    }}
                />
            </div>
            <div className="height">
                <Input
                    placeholder="PIN"
                    type="password"
                    value={pin}
                    onChange={(value: string) => {
                        if (value.length > 4) setPin(value.slice(0, 4))
                        else if (!isNaN(Number(value))) setPin(value)
                    }}
                />
            </div>
            <button
                className="button"
                onClick={buttonHandler}
                disabled={buttonDisableCheck()}
            >
                STWÓRZ TERMINARZ
            </button>
            <SnackBar isVisible={isVisible} message={message} />
        </section>
    )
}
