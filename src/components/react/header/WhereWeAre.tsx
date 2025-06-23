import { getI18NGlobal, getValueFromKey } from '@/i18n';
import { getLangFromUrl } from '@/i18n/utils';
import { motion } from 'framer-motion'

export const WhereWeAre: React.FC = () => {
    const lang = getLangFromUrl(
        new URL(window.location.href)
        )
    
        const i18n = getI18NGlobal({
        currentLocale: lang,
        });
    
        const t = (key: string) => {
        return getValueFromKey(key, i18n);
        };

        

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className=' h-full w-full flex justify-center lg:justify-between '
    >
      <div className=' lg:flex hidden items-end h-full'>
        <img loading="lazy"  src='/arrowDondeEstamos.svg' className=' h-52 pointer-events-none' alt='Arrow' />
      </div>
      <div className='  text-white  justify-center text-center  text-3xl flex items-center h-full'>
        <p>
          {t('header.whereWeAre.line1')}
          <br />
          {t('header.whereWeAre.line2')} <strong>{t('header.whereWeAre.line3')}</strong> <img loading="lazy"  src='/paraguayFLAG.png' className=' -translate-y-1 w-auto h-8 inline' alt='Emoji' />
        </p>
      </div>
      <div className=' lg:flex hidden relative items-end h-full'>
        <img loading="lazy"  src='/edificiosDondeEstamos.svg' className=' h-60 mr-6 pointer-events-none' alt='Arrow' />
      </div>
    </motion.div>
  )
}
