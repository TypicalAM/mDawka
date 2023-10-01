const KEY = 'data'

export const saveBody = (body: JSON) => {
    localStorage.setItem(KEY, JSON.stringify(body))
}

export const getBody = () => {
    return JSON.parse(localStorage.getItem(KEY) || '{}')
}
