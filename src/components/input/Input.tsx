import styles from './Input.module.css'

interface InputProps {
    className?: string,
    label?: string,
    placeholder?: string,
    name?: string,
    value?: string,
    id?: string,
    type?: string,
    min?: number,
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void,
    onClick?: (e: React.MouseEvent<HTMLInputElement>) => void,
    onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
}

export default function Input({ className, label, placeholder, name, value, type = 'text', min, id, onClick, onChange, onBlur }: InputProps) { 
    return (
        <div className={styles.input_group}>
        {label && <label htmlFor={id}>{label}</label>}
        <input 
            className={className ? className : styles.input}
            id={id}
            onClick={onClick}
            onChange={onChange}
            onBlur={onBlur}
            type={type}
            placeholder={placeholder}
            name={name}
            value={value || ''}
            min={min}
        />
        </div>
    )
}
