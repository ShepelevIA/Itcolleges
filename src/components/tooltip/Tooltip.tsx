import React, { useState } from 'react';
import styles from './Tooltip.module.css';

interface TooltipProps {
    message: string;
    children: React.ReactNode;
}

const Tooltip: React.FC<TooltipProps> = ({ message, children }) => {
    const [visible, setVisible] = useState(false);

    const showTooltip = () => setVisible(true);
    const hideTooltip = () => setVisible(false);

    return (
        <div className={styles.tooltipWrapper} onMouseEnter={showTooltip} onMouseLeave={hideTooltip}>
            {children}
            {visible && <div className={styles.tooltip}>{message}</div>}
        </div>
    );
};

export default Tooltip;