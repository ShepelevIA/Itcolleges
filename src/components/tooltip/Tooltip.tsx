import React, { useState } from 'react'
import styles from './Tooltip.module.css'

interface TooltipProps {
    message: string
    children: React.ReactNode
}

export default function Tooltip({ message, children } : TooltipProps) {
    const [visible, setVisible] = useState(false)

    const showTooltip = () => setVisible(true)
    const hideTooltip = () => setVisible(false)

    return (
        <div className={styles.tooltipWrapper} onMouseEnter={showTooltip} onMouseLeave={hideTooltip}>
            {children}
            {visible && <div className={styles.tooltip}>{message}</div>}
        </div>
    )
}