import { createContext, useContext, useState, ReactNode, useEffect } from 'react'

interface PreloaderContextProps {
    loading: boolean
    setLoading: (loading: boolean) => void
}

const PreloaderContext = createContext<PreloaderContextProps | undefined>(undefined)

export const usePreloader = () => {
    const context = useContext(PreloaderContext)
    if (!context) {
        throw new Error('usePreloader должен использоваться внутри PreloaderProvider.')
    }
    return context
}

export const PreloaderProvider = ({ children }: { children: ReactNode }) => {
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const handleLoad = () => {

            setTimeout(() => {
                setLoading(false)
            }, 2000) 
        }

        if (document.readyState === 'complete') {
            handleLoad()
        } else {
            window.addEventListener('load', handleLoad) 
        }

        return () => {
            window.removeEventListener('load',  handleLoad) 
        }
    }, [])

    return (
        <PreloaderContext.Provider value={{ loading, setLoading }}>
            {children}
        </PreloaderContext.Provider>
    )
}
