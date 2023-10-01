// const url = 'https://api.mdawka.piaseczny.dev/'
const url = 'http://localhost:8080/api'
const urlWebCal = 'webcal://localhost:8080/api'
const optionsWithHeaders = {
    headers: {
        'Content-Type': 'application/json',
    },
}

export interface Drug {
    drug_name: string // nazwa leku
    start_date: string // data rozpoczecia brania leku
    doses_per_week: number // ile razy na tydzien to bierzemy
    doses_num: number // ile lacznie dawek bierzemy
    hours: string[] // o ktorych godzinach to bierzemy, w formacie "18:07"
}

export const authWithPESEL = async (pesel: string, code: string) => {
    return fetch(url + '/pesel_code', {
        ...optionsWithHeaders,
        body: JSON.stringify({ pesel: pesel, code: code }),
        method: 'POST',
    })
}

export const authWithBarcode = async (barCode: string) => {
    return fetch(url + '/barcode', {
        ...optionsWithHeaders,
        body: JSON.stringify({ barcode_num: barCode }),
        method: 'POST',
    })
}

export const confirmRequest = async (id: string, drugs: Array<Drug>) => {
    return fetch(url + `/confirm/${id}`, {
        ...optionsWithHeaders,
        body: JSON.stringify({ drugs: drugs }),
        method: 'POST',
    })
}

export const getLink = (id: string) => {
    return (urlWebCal + `/webcal/${id}`)
}
