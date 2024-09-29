import React, { useState, useEffect, useRef } from 'react'

interface Basic_animate_elementProps {
    children: React.ReactNode
    direction?: 'top' | 'left' | 'bottom' | 'right' | 'flip-x' | 'flip-y' | 'zoom-in' | 'zoom-out' | 'bounce' | 'spin' | 'pulse'
    offset?: number 
    className?: string 
}

export default function Basic_animate_element({
    children,
    direction,
    offset = 100, // Значение по умолчанию для смещения
    className,
}: Basic_animate_elementProps) {
    const [isVisible, setIsVisible] = useState(false)
    const elementRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true)
                } else {
                    setIsVisible(false)
                }
            },
            {
                threshold: 0.1, 
            }
        )

        if (elementRef.current) {
            observer.observe(elementRef.current)
        }

        return () => {
            if (elementRef.current) {
                observer.unobserve(elementRef.current)
            }
        }
    }, [])

    const getTransformStyle = () => {
        if (!direction) return '' 

        switch (direction) {
            case 'top':
                return `translateY(-${offset}px)`
            case 'bottom':
                return `translateY(${offset}px)`
            case 'left':
                return `translateX(-${offset}px)`
            case 'right':
                return `translateX(${offset}px)`
            case 'flip-x':
                return `rotateX(90deg)`
            case 'flip-y':
                return `rotateY(90deg)` 
            case 'zoom-in':
                return `scale(0.5)` 
            case 'zoom-out':
                return `scale(1.5)` 
            case 'bounce':
                return `translateY(-${offset}px) scale(1.1)` 
            case 'spin':
                return `rotateX(360deg)` 
            case 'pulse':
                return `scale(1.2)` 
            default:
                return ''
        }
    }

    return (
        <div
            className={`${className ? className : ''}`}
            ref={elementRef}
            style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translate(0, 0)' : getTransformStyle(),
                transition: isVisible
                    ? 'opacity 0.8s ease-out, transform 0.8s ease-out'
                    : 'opacity 0.3s ease-out, transform 0.3s ease-out',
            }}
        >
            {children}
        </div>
    )
}
