import {ConfirmWrapper, Wrapper} from '@/app/scan/scan.styles'
import React, {Suspense, useEffect, useState} from 'react'
import {Calendar} from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import {
    Arrow,
    ArrowWrapper,
    InputGroup,
    InputHour,
    InputSmall,
    InputWrapper,
    Text,
} from './Confirm.styles'
import Input from '../Input/Input'
import AnimatedLogo from '../AnimatedLogo/AnimatedLogo'
import { Loader } from '../Loader/Loader.styles'
import { saveBody } from '@/app/service/storage.service'

export default function CalendarComponent() {
    const [data, setData] = useState<any>(null)
    const [hoursState, setHoursState] = useState<string[]>([])
    const [date, setDate] = useState<Date | Date[]>(new Date())
    const [index, setIndex] = React.useState(0)

    useEffect(() => {
        const obj = localStorage.getItem('data') || '{}'
        setData(JSON.parse(obj))
    }, [])

    useEffect(() => {
        if (data === undefined || data === null) return
        if (data.drugs === undefined) return
        saveBody(data)
    }, [data])

    useEffect(() => {
        if(data === undefined || data === null) return
        const houers: string[] = (data.drugs[index].houers as [])
        if(houers.length < data.drugs[index].doses_per_day){
            for (let i = 0; i < data.drugs[index].doses_per_day; i++) {
                houers.push("")
            }
        }
        setHoursState(houers    )
    }, [index])

    function updateData() {
        if (data === undefined) return
        if (data.drugs === undefined) return
        const newData: any = data
        newData.drugs[index].date = date
        newData.drugs[index].houers = hoursState
        setData(newData)
    }

    const content =
        data != null ? (
            <Suspense fallback={<Loader />}>
                <ConfirmWrapper>
                    <Wrapper>
                        <AnimatedLogo></AnimatedLogo>
                        <ArrowWrapper>
                            <Arrow
                                onClick={() => {
                                    if (index > 0) {
                                        updateData()
                                        setIndex(index - 1)
                                    }
                                }}
                            >
                                🡐
                            </Arrow>
                            <Arrow
                                onClick={() => {
                                    if (index < data.drugs.length - 1) {
                                        updateData()
                                        setIndex(index + 1)
                                    }
                                }}
                            >🡒</Arrow>
                        </ArrowWrapper>
                        <InputWrapper>
                            <Input
                                placeholder="Nazwa Leku"
                                disabled
                                value={data.drugs[index].drug_name}
                            />
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
                        <Calendar
                            locale="pl"
                            value={data.drugs[index].start_date || date}
                            onChange={(value) =>
                                (data.drugs[index].start_date =
                                    value?.toString())
                            }
                        />
                        <InputGroup>
                            <Text>Co ile dni</Text>
                            <InputSmall>
                                <Input
                                    disabled
                                    value={data.drugs[index].days_interval}
                                />
                            </InputSmall>
                        </InputGroup>
                        <InputGroup>
                            <Text>Ilość dawek</Text>
                            <InputSmall>
                                <Input
                                    disabled
                                    value={data.drugs[index].doses_per_day}
                                />
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
                            {Array(Number(data.drugs[index].doses_per_day))
                                .fill('')
                                .map((i, y) => (
                                    <InputHour>
                                        <Input
                                            type="time"
                                            value={hoursState[y]}
                                            onChange={(e: string) => {
                                                const newHoursState = hoursState
                                                newHoursState[y] = e
                                                setHoursState(newHoursState)
                                            }}
                                        ></Input>
                                    </InputHour>
                                ))}
                        </InputGroup>

                        <button className="button">Zatwierdź</button>
                    </Wrapper>
                </ConfirmWrapper>
            </Suspense>
        ) : (
            ''
        )

    return <>{data != null ? content : <Loader />}</>
}
