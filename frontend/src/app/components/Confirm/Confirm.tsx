import {ConfirmWrapper, Wrapper} from '@/app/scan/scan.styles'
import React, {Suspense, useEffect, useState} from 'react'
import {Calendar} from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import {Arrow, ArrowLeft, ArrowWrapper, InputGroup, InputHour, InputSmall, InputWrapper, Text,} from './Confirm.styles'
import Input from '../Input/Input'
import AnimatedLogo from '../AnimatedLogo/AnimatedLogo'
import {Loader} from '../Loader/Loader.styles'
import {saveBody} from '@/app/service/storage.service'
import Image from 'next/image'
import {confirmRequest, getLink} from "@/app/service/api.service";

export default function CalendarComponent() {
    const [data, setData] = useState<any>(null)
    let hoursState: string[] = []
    const [date, setDate] = useState<Date | Date[]>(new Date())
    const [index, setIndex] = useState(0)

    const arrowSize = 30

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
        if (data === undefined || data === null) return
        const hours: string[] = (data.drugs[index].hours as []) || []
        if (hours.length < data.drugs[index].doses_per_day) {
            for (let i = 0; i < data.drugs[index].doses_per_day; i++) {
                hours.push("")
            }
        }
        hoursState = hours
    }, [index])

    function updateData() {
        if (data === undefined) return
        if (data.drugs === undefined) return
        const newData: any = data
        newData.drugs[index].date = date
        newData.drugs[index].hours = hoursState
        setData(newData)
    }

    async function buttonHandler() {
        const newData = data
        newData.drugs.forEach((item: any) => {
            item.hours = ["00:00", "12:00", "13:00", "15:00", "18:00"].slice(0, item.doses_per_day)
            item.drug = {
                drug_name: item.drug_name,
                days_interval: item.days_interval,
                doses_per_day: item.doses_per_day,
                total_doses: item.total_doses,
            }
            item.drug_name = undefined
            item.days_interval = undefined
            item.doses_per_day = undefined
            item.total_doses = undefined
            let date = new Date()
            if(item.start_date !== undefined) {
                date = new Date(item.start_date)
            }
            item.start_date = date.toISOString().split('T')[0]
        })
        const response = await confirmRequest(data.uuid, newData.drugs)
        if (response.status < 300) {
            window.location.href = getLink(data.uuid)
        }
    }

    const content =
        data != null ? (
            <Suspense fallback={<Loader/>}>
                <ConfirmWrapper>
                    <Wrapper>
                        <AnimatedLogo></AnimatedLogo>
                        <ArrowWrapper>
                            <ArrowLeft
                                onClick={() => {
                                    if (index > 0) {
                                        updateData()
                                        setIndex(index - 1)
                                    }
                                }}
                            >
                                <Image
                                    src="arrow.svg"
                                    alt="arrow"
                                    width={arrowSize}
                                    height={arrowSize}
                                />
                            </ArrowLeft>
                            <Arrow
                                onClick={() => {
                                    if (index < data.drugs.length - 1) {
                                        updateData()
                                        setIndex(index + 1)
                                    }
                                }}
                            >
                                <Image
                                    src="arrow.svg"
                                    alt="arrow"
                                    width={arrowSize}
                                    height={arrowSize}
                                />
                            </Arrow>
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
                            <Text>Dzienna liczba dawek?</Text>
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
                                    <InputHour key={y.toString()}>
                                        <Input
                                            type="time"
                                            value={hoursState[y]}
                                            onChange={(e: string) => {
                                                hoursState[y] = e
                                            }}
                                        ></Input>
                                    </InputHour>
                                ))}
                        </InputGroup>

                        <button className="button" onClick={buttonHandler}>Zatwierdź</button>
                    </Wrapper>
                </ConfirmWrapper>
            </Suspense>
        ) : (
            ''
        )

    return <>{data != null ? content : <Loader/>}</>
}
