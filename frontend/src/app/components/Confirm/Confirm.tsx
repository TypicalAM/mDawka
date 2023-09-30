import { ConfirmWrapper, Wrapper } from '@/app/scan/scan.styles'
import React from 'react'
import { Calendar } from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import { Text } from './Confirm.styles'
import Input from '../Input/Input'

export default function CalendarComponent() {
    return (
        <ConfirmWrapper>
            <Wrapper>
                <Text>Wybierz date początkową</Text>
            </Wrapper>
        </ConfirmWrapper>
    )
}
