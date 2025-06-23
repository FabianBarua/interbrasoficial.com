'use client'

import React from 'react'
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion'
import { cn } from '@/shared/tailwind'

export interface MagicCardProps {
  children: React.ReactNode
  className?: string
  gradientSize?: number
  gradientColor?: string
  gradientOpacity?: number
}

export function MagicCard({
  children,
  className = '',
  gradientSize = 200,
  gradientColor = '#ebebeb'
}: MagicCardProps): JSX.Element {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  return (
    <div
      onMouseMove={(e) => {
        const { left, top } = e.currentTarget.getBoundingClientRect()

        mouseX.set(e.clientX - left)
        mouseY.set(e.clientY - top)
      }}
      className={cn(
        'group relative flex size-full overflow-hidden rounded-xl bg-neutral-100  border text-neutral-800 ',
        className
      )}
    >
      <div className='relative z-10'>{children}</div>
      <motion.div
        className='pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100'
        style={{
          background: useMotionTemplate`radial-gradient(${gradientSize}px circle at ${mouseX}px ${mouseY}px, ${gradientColor}, transparent 100%)`
        }}
      />
    </div>
  )
}
