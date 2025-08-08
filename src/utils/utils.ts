import { IPrice } from "@/app/mocks/indes"

const currencyMapper = {
    'usd': '$',
    'zl': 'zl',
    'eur': '€'
}

export const convertPrice = ({ value, curency }: IPrice): string => {
    return `${value}${currencyMapper[curency]}`
}

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}