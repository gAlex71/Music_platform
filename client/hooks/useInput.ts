import React, { useState } from "react"

//Хук для оживления инпутов, из которых мы сможем доставать данные
export const useInput = (initialValue) => {
    const [value, setValue] = useState(initialValue)

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value)
    }

    return{
        value, onChange
    }
}