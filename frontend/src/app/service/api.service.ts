// const url = 'https://api.mdawka.piaseczny.dev/'
const url = 'http://localhost:8080/api'
const optionsWithHeaders = {
    headers: {
        'Content-Type': 'application/json',
    },
}

export const authWithPESEL = async (pesel: string, code: string) => {
    return fetch(url + '/pesel', {
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
