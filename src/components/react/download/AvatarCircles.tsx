'use client'

import { cn } from '@/shared/tailwind'

interface AvatarCirclesProps {
  className?: string
  avatarUrls: string[]
  pricipalIcon: string
}

export const AvatarCircles = ({
  className,
  avatarUrls,
  pricipalIcon
}: AvatarCirclesProps): JSX.Element => {
  return (
    <div className={cn('z-10 flex  justify-between', className)}>

      <div
        className='flex size-12   bg-interbrasGreen-500 items-center justify-center rounded-full   text-center  p-3'
      >
        <img loading="lazy"
          src={pricipalIcon}
        />
      </div>

      <div className=' flex -space-x-2 '>

        {avatarUrls.map((url, index) => (
          <div
            key={index}
            className='flex size-7   items-center justify-center rounded-full border-2 border-black text-center '
          >
            <img loading="lazy"
              key={index}
              className=' size-full rounded-full object-cover'
              src={url}
              width={48}
              height={48}
              alt={`Avatar ${index + 1}`}
            />

          </div>

        ))}

      </div>
    </div>
  )
}

