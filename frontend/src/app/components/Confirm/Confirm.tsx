import { ConfirmWrapper, Wrapper } from '@/app/scan/scan.styles'
import React, { Suspense } from 'react'
import { Calendar } from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import {
    InputGroup,
    InputHour,
    InputSmall,
    InputWrapper,
    Text,
} from './Confirm.styles'
import Input from '../Input/Input'
import AnimatedLogo from '../AnimatedLogo/AnimatedLogo'
import { Loader } from '../Loader/Loader.styles'

export default function CalendarComponent() {
    const data = JSON.parse(localStorage.getItem('data') || '{}')
    const [index, setIndex] = React.useState(0)
    return (
        <>
            <Suspense fallback={<Loader />}>
                <ConfirmWrapper>
                    <Wrapper>
                        <AnimatedLogo></AnimatedLogo>
                        <InputWrapper>
                            <Input placeholder="Nazwa Leku" disabled value={data.drugs[0].drug_name} />
                        </InputWrapper>
                        <Text
                            style={{
                                width: '300px',
                                textAlign: 'left',
                                justifyContent: 'start',
                                fontSize: 20,
                            }}
                        >
                            Data rozpoczęcia
                        </Text>
                        <Calendar locale="pl" />
                        <InputGroup>
                            <Text>Co ile dni</Text>
                            <InputSmall>
                                <Input disabled value={data.drugs[0].days_interval}/>
                            </InputSmall>
                        </InputGroup>
                        <InputGroup>
                            <Text>Ilość dawek</Text>
                            <InputSmall>
                                <Input disabled value={data.drugs[0].doses_per_day}/>
                            </InputSmall>
                        </InputGroup>
                        <Text
                            style={{
                                width: '300px',
                                textAlign: 'left',
                                justifyContent: 'start',
                                fontSize: 20,
                            }}
                        >
                            Godziny Dawek
                        </Text>
                        <InputGroup>
                            {['12:00', '13:00', '15:00'].map((item) => (
                                <InputHour>
                                    <Input type="time"></Input>
                                </InputHour>
                            ))}
                        </InputGroup>

                        <button className="button">Zatwierdź</button>
                    </Wrapper>
                </ConfirmWrapper>
            </Suspense>
        </>
    )
}
