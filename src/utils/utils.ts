import { IPrice } from "@/app/mocks/indes"

const currencyMapper = {
    'usd': '$',
    'zl': 'zl',
    'eur': '€'
}

export const convertPrice = ({ value, curency }: IPrice): string => {
    return `${value}${currencyMapper[curency]}`
}