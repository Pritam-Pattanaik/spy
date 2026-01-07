import { useLanguage } from '../context/LanguageContext'

function Marquee() {
    const { t } = useLanguage()

    return (
        <div className="marquee-container">
            <div className="container mx-auto relative overflow-hidden">
                <div className="marquee-text font-medium">
                    {t('marquee.text')} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {t('marquee.text')}
                </div>
            </div>
        </div>
    )
}

export default Marquee
