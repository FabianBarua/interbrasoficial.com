import { motion } from 'framer-motion'

interface MenuToggleProps {
  toggle: () => void
}


interface PathProps {
  d: string
}

const Path = (
  { d }: PathProps
): JSX.Element => (
  <path
    fill='transparent'
    strokeWidth='3'
    stroke='hsl(0, 0%, 100%)'
    strokeLinecap='round'
    d={d}
  />
);

export const MenuToggle = ({ toggle }: MenuToggleProps): JSX.Element => (
  <motion.button
    initial={
      {
        opacity: 0,
      }
    }

    animate={
      {
        opacity: 1,
      }
    }

    aria-label='Toggle Menu'
    className='left-[20px] top-[13px] size-[40px] flex justify-center items-center rounded-full z-10   absolute hiddenTempAnimation  ' onClick={toggle}
  >
    <svg className=' translate-y-[1px]' width='19' height='19' viewBox='0 0 23 23'>
      <Path d='M 2 2.5 L 20 2.5' />
      <Path d='M 2 9.423 L 20 9.423' />
      <Path d='M 2 16.346 L 20 16.346' />
    </svg>
  </motion.button>
)
