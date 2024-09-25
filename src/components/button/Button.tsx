import { ReactNode } from 'react'
import styles from './Button.module.css'

interface Button {
    className?: string
    children: ReactNode, 
    disabled?: boolean
    onClick?: () => void
}

export default function Card({className, children, disabled, onClick}: Button) {

    return (
        <button 
        className={className ? className : styles.btn} 
        onClick={onClick}
        disabled={disabled}
        >
            {children}
        </button>
    )
}