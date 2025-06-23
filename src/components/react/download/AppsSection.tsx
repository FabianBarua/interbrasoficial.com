import { getI18NGlobal, getValueFromKey } from '@/i18n'
import { ScooterAndroidUrl, ScooterIosUrl, scooterTitanAndXtremeUrls, scooterLenzod } from '@/shared/constants'
import React, { useState, useEffect } from 'react'
import { Modal, ModalBody, ModalContent, ModalFooter, ModalTrigger, useModal } from '@/components/react/download/AnimatedModal'
import { AvatarCircles } from '@/components/react/download/AvatarCircles'
import { MagicCard } from '@/components/react/download/MagicCard'


interface DownloadCardProps {
  onClick: () => void
  title: string
  models: string[]
  avatarUrls: string[]
  pricipalIcon: string
  lang: string
}


const DownloadCard: React.FC<DownloadCardProps> = (
  { onClick, title, models, avatarUrls, pricipalIcon, lang }
) => {


  const i18n = getI18NGlobal({
    currentLocale: lang,
  });

  const t = (key: string) => {
    return getValueFromKey(key, i18n);
  };


  return (
    <MagicCard
      className='w-full max-w-[90%] lg:max-w-64 flex flex-col bg-white  p-5 rounded-2xl border-2 border-interbrasGray/65'
    >
      <AvatarCircles
        avatarUrls={avatarUrls} pricipalIcon={
          pricipalIcon
        }
      />
      <p className=' text-lg font-semibold mt-2'>{title}</p>
      <div className=' flex gap-2 h-min '>
        {
          models.map((model, index) => (
            <div key={index} className=''>
              <p className=' leading-4 font-light text-neutral-800/70'>{model}</p>
            </div>
          )
          )
        }
      </div>

      <button
        onClick={onClick}
        className=' w-min text-lg text-interbrasGreen-500 leading-4 mt-3'
      >
        {t('downloads.download')}
      </button>

    </MagicCard>

  )
}

interface DownloadModalCardProps {
  name: string
  models: string[]
  imageCard: string
  url: string
  lang: string
}

const DownloadModalCard: React.FC<DownloadModalCardProps> = (
  {
    name, models, imageCard, url, lang
  }
) => {

  const i18n = getI18NGlobal({
    currentLocale: lang,
  });

  const t = (key: string) => {
    return getValueFromKey(key, i18n);
  };

  return (
    <div className=' w-full lg:h-20 rounded-xl flex flex-col lg:flex-row gap-2 bg-gray-100 border p-2 '>
      <div className=' flex '>
        <img loading="lazy" src={imageCard} className=' size-[48px] my-auto ml-2 rounded-xl border' alt='' />
        <div className=' ml-3  my-auto'>
          <h2 className=' text-xl font-medium'>
            {name}
          </h2>
          <div className=' flex gap-2'>
            {
              models.map((model, index) => (
                <p key={index} className=' text-neutral-800/70 bg-black/10 px-2 rounded-lg'>
                  {model}
                </p>
              ))
            }
          </div>
        </div>
      </div>
      <a hrefLang={lang === "pt" ? "pt-BR" : lang || "es"}
        href={url}
        target='_blank'
        className=' p-2 w-full lg:w-auto my-auto h-full justify-center items-center flex ml-auto transition-colors text-neutral-800/70 hover:text-neutral-800/90 bg-black/10 hover:bg-black/20 rounded-lg px-5 gap-2'
        rel='noreferrer'
      >
        {t('downloads.download')}
        <svg
          xmlns='http://www.w3.org/2000/svg'
          id='Layer_1'
          data-name='Layer 1'
          viewBox='0 0 24 24'
          className=' size-5'
          fill='currentColor'
        >
          <path d='m19.949,5.536l-3.484-3.486c-1.323-1.322-3.081-2.05-4.95-2.05h-4.515C4.243,0,2,2.243,2,5v14c0,2.757,2.243,5,5,5h10c2.757,0,5-2.243,5-5v-8.515c0-1.871-.729-3.628-2.051-4.95Zm-1.414,1.415c.318.317.587.67.805,1.05h-4.341c-.552,0-1-.449-1-1V2.659c.38.218.733.487,1.051.805l3.484,3.486Zm1.465,12.05c0,1.654-1.346,3-3,3H7c-1.654,0-3-1.346-3-3V5c0-1.654,1.346-3,3-3h4.515c.163,0,.325.008.485.023v4.977c0,1.654,1.346,3,3,3h4.977c.015.16.023.322.023.485v8.515Zm-4.293-2.895c.391.39.391,1.023,0,1.414l-1.613,1.614c-.577.577-1.336.866-2.094.866s-1.517-.289-2.094-.866l-1.613-1.614c-.391-.391-.391-1.024,0-1.414.391-.391,1.023-.391,1.414,0l1.293,1.293v-4.398c0-.552.447-1,1-1s1,.448,1,1v4.398l1.293-1.293c.391-.391,1.023-.391,1.414,0Z' />
        </svg>
      </a>
    </div>
  )
}


interface AppsSectionProps {
  lang: string
}


export const AppsSection = ({ lang }: AppsSectionProps) => {
  return (
    <Modal>
      <AppsSectionChild lang={lang} />
    </Modal>
  )
}


export const AppsSectionChild = ({ lang }: AppsSectionProps) => {

  interface FilesProps {
    id: string
    name: string
    models: string[]
    avatarUrls: string[]
    pricipalIcon: string
    files: React.FC[]
  }

  const i18n = getI18NGlobal({
    currentLocale: lang,
  });

  const t = (key: string) => {
    return getValueFromKey(key, i18n);
  };

  const files = [
    {
      id: '1',
      name: 'Scooters Interbras',
      models: ['10.5', '8.5 pro'],
      avatarUrls: ['/downloads/apple-icon.png', '/downloads/google-icon.png'],
      pricipalIcon: '/home/slideSection/3.svg',
      files: [
        () => {
          return (
            <DownloadModalCard
              lang={lang}
              name={
                t('downloads.files.scooter105y85.1')
              } models={['10.5', '8.5 pro']} imageCard='/downloads/google-icon.png' url={ScooterAndroidUrl}
            />
          )
        },
        () => {
          return (
            <DownloadModalCard
              lang={lang}
              name={
                t('downloads.files.scooter105y85.2')
              } models={['10.5', '8.5 pro']} imageCard='/downloads/apple-icon.png' url={ScooterIosUrl}
            />
          )
        },
        () => {
          return (
            <DownloadModalCard
              lang={lang}
              name={
                t('downloads.files.scooter105y85.4')
              } models={['10.5', '8.5 pro']} imageCard='/downloads/lenzod-icon.png' url={scooterLenzod.android}
            />
          )
        },
        () => {
          return (
            <DownloadModalCard
              lang={lang}
              name={
                t('downloads.files.scooter105y85.3')
              } models={['10.5', '8.5 pro']} imageCard='/downloads/lenzod-icon.png' url={scooterLenzod.ios}
            />
          )
        },
      ]
    },
    {
      id: '2',
      name: 'Scooters Interbras - 2',
      models: ['Xtreme', 'Titan'],
      avatarUrls: ['/downloads/apple-icon.png', '/downloads/google-icon.png'],
      pricipalIcon: '/home/slideSection/3.svg',
      files: [
        () => {
          return (
            <DownloadModalCard
              lang={lang}
              name={
                t('downloads.files.scooter105y85.1')
              } models={['10.5', '8.5 pro']} imageCard='/downloads/google-icon.png' url={scooterTitanAndXtremeUrls.android}
            />
          )
        },
        () => {
          return (
            <DownloadModalCard
              lang={lang}
              name={
                t('downloads.files.scooter105y85.2')
              } models={['10.5', '8.5 pro']} imageCard='/downloads/apple-icon.png' url={scooterTitanAndXtremeUrls.ios}
            />
          )
        }
      ]
    },
  ]
  const [selected, setSelected] = useState<FilesProps | null>(null)

  useEffect(() => {

    const params = new URLSearchParams(window.location.search)

    if (selected != null) {
      params.set('id', String(selected.id))
      window.history.replaceState({}, '', `${window.location.pathname}?${params}`)
    }

  }, [selected])

  useEffect(() => {
    // get params
    const params = new URLSearchParams(window.location.search)
    const id = params.get('id')
    const file = files.find((file) => file.id === id)
    
    if (file) {
      setSelected(file)
    } else {
      setSelected(null)
      params.delete('id')
      window.history.replaceState({}, '', window.location.pathname)
    }
  },[])

  const handleClose = () => {
    setSelected(null)
    const params = new URLSearchParams(window.location.search)
    params.delete('id')
    window.history.replaceState({}, '', `${window.location.pathname}?${params}`)
  }

  return (
    <>

      <div className=' w-full flex-wrap flex gap-3   lg:justify-start justify-center ' id='apps'>

        {
          files.map((file, index) => (
            <DownloadCard
              lang={lang}
              title={file.name}
              models={file.models}
              avatarUrls={file.avatarUrls}
              pricipalIcon={file.pricipalIcon}
              key={index}
              onClick={
                () => {
                  setSelected(file)
                }
              }
            />
          ))
        }

        <ModalBody
         onClose={handleClose}
        >
          <ModalContent>
            <h4 className='text-lg md:text-2xl text-neutral-600 font-bold text-center  my-4 lg:my-6'>
              {t('downloads.download')} {selected?.name}
            </h4>
          </ModalContent >
          <div className=' h-full flex-1 px-5 flex flex-col gap-2 lg:justify-start justify-center'>
            {
              selected?.files.map((File, index) => (
                <File
                  key={index}
                />
              ))
            }
          </div>
          <ModalFooter className='gap-4 mt-2'>
            <ModalTrigger
              className='px-2 py-1 bg-interbrasGreen-500 text-white  border border-gray-300 rounded-md text-base w-28'
            >
              {t('downloads.close')}
            </ModalTrigger>
          </ModalFooter>
        </ModalBody>

      </div>

    </>
  )

}