import { ChangeEvent, DetailedHTMLProps, SelectHTMLAttributes } from 'react'
import styles from './Select.module.css'

interface SelectProps extends DetailedHTMLProps<SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement> {
    label?: string,
    value?: string | number,
    onChange?: (e: ChangeEvent<HTMLSelectElement>) => void,
    disabled?: boolean,
    name?: string,
    definitely_field?: boolean
}

export default function Select({ children, name, label, value, definitely_field, onChange, disabled }: SelectProps) {
    return (
        <div className={styles.wrapper_select}>
            {label && <label className={styles.label_select}>
                {label}
                {definitely_field && <span className={styles.definitely_field}>*</span>}
            </label>}
            <div className={styles.selectContainer}>
                <select
                    name={name}
                    className={styles.select}
                    value={value || ''}
                    onChange={onChange}
                    disabled={disabled}
                >
                    {children}
                </select>
            </div>
        </div>
    )
}
