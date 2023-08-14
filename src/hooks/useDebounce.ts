import {useState, useEffect} from 'react'
export const useDebounce = (value:string, delay:number) => {
    const [debouncedValue, setDebounceValue] = useState<string>(value)
    useEffect(
        ()=>{
            const handler = setTimeout(()=>{
                setDebounceValue(value)
            },  delay)

            return ()=>{
                clearTimeout(handler)
            } 
            //timeout 호출 도중에 value나 delay가 바뀌어서 다시 호출되면 clearTimeout으로 없애준다. 
        },
        [value, delay]
    )
    return debouncedValue;
}
