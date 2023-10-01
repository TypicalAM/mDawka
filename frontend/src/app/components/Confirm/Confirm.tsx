import {ConfirmWrapper, Wrapper} from '@/app/scan/scan.styles'
import React, {Suspense, useState} from 'react'
import {Calendar} from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import {
    Arrow, ArrowWrapper,
    InputGroup,
    InputHour,
    InputSmall,
    InputWrapper,
    Text,
} from './Confirm.styles'
import Input from '../Input/Input'
import AnimatedLogo from '../AnimatedLogo/AnimatedLogo'
import {Loader} from '../Loader/Loader.styles'

export default function CalendarComponent() {
    const obj = localStorage.getItem('data') || '{}'
    const [data, setData] = useState(JSON.parse(obj))
    const [index, setIndex] = React.useState(0)
    const hoursState: string[] = data.drugs[index].houers as [] || ["", "", "", "", ""]
    let date: any = data.drugs[index].date as Date || new Date()

    function updateData() {
        const newData = data
        console.log(date)
        newData.drugs[index].date = date
        localStorage.setItem("data", JSON.stringify(newData))
        newData.drugs[index].houers = hoursState.filter((item: string) => item !== "")
        setData(newData)
    }

    return (
        <>
            <Suspense fallback={<Loader/>}>
                <ConfirmWrapper>
                    <Wrapper>
                        <AnimatedLogo></AnimatedLogo>
                        <ArrowWrapper>
                            <Arrow onClick={() => {
                                if (index > 0) {
                                    setIndex(index - 1)
                                    updateData()
                                }
                            }
                            }>
                                🡐
                            </Arrow>
                            <Arrow onClick={
                                () => {
                                    if (index < data.drugs.length - 1) {
                                        setIndex(index + 1)
                                        updateData()
                                    }
                                }
                            }>
                                🡒
                            </Arrow>
                        </ArrowWrapper>
                        <InputWrapper>
                            <Input placeholder="Nazwa Leku" disabled value={data.drugs[index].drug_name}/>
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
                        <Calendar locale="pl" value={date}/>
                        <InputGroup>
                            <Text>Co ile dni</Text>
                            <InputSmall>
                                <Input disabled value={data.drugs[index].days_interval}/>
                            </InputSmall>
                        </InputGroup>
                        <InputGroup>
                            <Text>Ilość dawek</Text>
                            <InputSmall>
                                <Input disabled value={data.drugs[index].doses_per_day}/>
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
                            {Array(Number(data.drugs[index].doses_per_day)).fill("").map((i,y) => (
                                <InputHour>
                                    <Input type="time" value={hoursState[y]}></Input>
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
