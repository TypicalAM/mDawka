import React from 'react'
import styles from './Input.module.css'

interface Props {
    placeholder: string
    onChange: Function
}

export default function Input({ placeholder, onChange }: Props) {
    return (
        <div className={styles.inputWrapper}>
            <input
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
            />
        </div>
    )
}
