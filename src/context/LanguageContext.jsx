import { createContext, useContext, useState, useEffect } from 'react'
import en from '../locales/en.json'
import hi from '../locales/hi.json'

const LanguageContext = createContext()

const translations = { en, hi }

export function LanguageProvider({ children }) {
    const [language, setLanguage] = useState(() => {
        const saved = localStorage.getItem('spy-language')
        return saved || 'en'
    })

    useEffect(() => {
        localStorage.setItem('spy-language', language)
        document.documentElement.lang = language
    }, [language])

    const t = (key) => {
        const keys = key.split('.')
        let value = translations[language]
        for (const k of keys) {
            value = value?.[k]
        }
        return value || key
    }

    const toggleLanguage = () => {
        setLanguage(prev => prev === 'en' ? 'hi' : 'en')
    }

    return (
        <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    )
}

export function useLanguage() {
    const context = useContext(LanguageContext)
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider')
    }
    return context
}
