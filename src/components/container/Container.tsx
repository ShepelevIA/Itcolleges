import { ReactNode } from 'react'
import styles from './Container.module.css'

interface Container {
    children: ReactNode;
}

export default function Container ({children}: Container) {
    return (
        <div className={styles.container}>
            {children}
        </div>
    )
}