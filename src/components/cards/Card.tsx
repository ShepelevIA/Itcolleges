import { ReactNode, CSSProperties } from 'react'
import styles from './Card.module.css'

interface Card {
    className?: string
    children: ReactNode, 
    border?: string,
    boxShadow?: string,
    onClick?: () => void
}

export default function Card({className, children, border, boxShadow, onClick}: Card) {
    const cardStyle: CSSProperties = {
        border: border,      
        boxShadow: boxShadow,
        cursor: 'pointer'
    };

    return (
        <div className={`${styles.card} ${className}`} style={cardStyle}
        onClickCapture={onClick}
        >
            {children}
        </div>
    )
}