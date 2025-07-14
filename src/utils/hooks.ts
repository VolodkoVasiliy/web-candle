import { useEffect, useState } from "react"

const PHONE_SIZE = 600

interface Size {
    width: number,
    height: number
}

export const useWindowSize = () => {
    const [windowSize, setWindowSize] = useState<Size>({
        width: 430,
        height: 1000
    })

    useEffect(() => {
        const handleResize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight
            })
        }
        handleResize()
        window.addEventListener('resize', handleResize)

        return () => window.removeEventListener('resize', handleResize)
    }, [])

    return windowSize;
}

export const useIsPhoneOrSmaller = () => {
    const { width } = useWindowSize()
    if (!width) return undefined;

    return width <= PHONE_SIZE
}
