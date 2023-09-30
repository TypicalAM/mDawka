import { CalendarWrapper, Wrapper } from '@/app/scan/scan.styles'
import React from 'react'
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
