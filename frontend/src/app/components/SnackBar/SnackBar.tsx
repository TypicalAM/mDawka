import React from 'react'
import styles from './SnackBar.module.css'
import Image from 'next/image'

interface SnackBarProps {
    isVisible: boolean
    message: string
}

export default function SnackBar(props: SnackBarProps) {
    return (
        <div
            className={`${styles.wrapper} ${
                props.isVisible ? styles.active : ''
            }`}
        >
            <Image src="/error.svg" alt="error" height={50} width={50} />
            {props.message}
        </div>
    )
}
