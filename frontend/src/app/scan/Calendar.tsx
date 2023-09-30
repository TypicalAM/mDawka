import React from 'react'
import { Wrapper, CalendarWrapper } from './BarcodeReader.styles'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'

export default function CalendarComponent() {
    return (
        <CalendarWrapper>
            <Wrapper>
                <Calendar></Calendar>
            </Wrapper>
        </CalendarWrapper>
    )
}
