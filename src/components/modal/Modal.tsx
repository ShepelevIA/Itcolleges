import { useState, useEffect } from 'react'
import styles from './Modal.module.css'

interface ModalProps {
    isOpen: boolean
    children: React.ReactNode,
    heading?: string,
    onClose: () => void
}

export default function Modal({ isOpen, children, onClose, heading }: ModalProps) {
    const [isClosing, setIsClosing] = useState(false)

    useEffect(() => {
        if (isOpen) {
            setIsClosing(false)
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = ''
        }

        return () => {
            document.body.style.overflow = ''
        }
    }, [isOpen])

    const handleClose = () => {
        setIsClosing(true)
        setTimeout(() => {
            onClose()
        }, 300)
    }

    if (!isOpen && !isClosing) return null

    return (
        <div className={`${styles.modal_overlay} ${isClosing ? styles.fade_out : styles.fade_in}`} onClick={handleClose}>
            <div
                className={`${styles.modal} ${isClosing ? styles.modal_hide : styles.modal_show}`}
                onClick={(e) => e.stopPropagation()}
            >
                <div className={styles.model_top_control}>
                    <h3>{heading}</h3>
                    <button className={styles.close_button} onClick={handleClose}>
                        <img src="/img/close.svg" alt="close.svg" />
                    </button>
                </div>
                <div className={styles.modal_content}>
                    {children}
                </div>
            </div>
        </div>
    )
}
