import React from 'react'
import styles from './Input.module.css'

interface Props {
    placeholder?: string
    onChange?: Function
    value?: string
    disabled?: boolean
    type?: string
}

export default function Input({
    placeholder,
    onChange,
    value,
    disabled,
    type,
}: Props) {
    return (
        <div className={styles.inputWrapper}>
            <input
                value={value}
                onChange={(e) =>
                    onChange != undefined ? onChange(e.target.value) : ''
                }
                placeholder={placeholder}
                disabled={disabled}
                type={type || 'text'}
            />
        </div>
    )
}
