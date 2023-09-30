import { ConfirmWrapper, Wrapper } from '@/app/scan/scan.styles'
import React from 'react'
import { Calendar } from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import { InputWrapper, Text } from './Confirm.styles'
import Input from '../Input/Input'

export default function CalendarComponent() {
    return (
        <ConfirmWrapper>
            <Wrapper>
                <InputWrapper>
                    <Input
                        placeholder="Drug name"
                        disabled
                        onChange={() => {}}
                    />
                </InputWrapper>
                <Calendar />
                <InputWrapper>
                    <Input onChange={() => {}} />
                </InputWrapper>
                <InputWrapper>
                    <Input onChange={() => {}} />
                </InputWrapper>
                <button>Confirm</button>
            </Wrapper>
        </ConfirmWrapper>
    )
}
