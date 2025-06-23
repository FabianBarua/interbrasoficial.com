import { motion, useCycle } from "framer-motion";
import { useRef, useEffect, type MutableRefObject } from "react";
import { Navigation } from "./Navigation";
import { MenuToggle } from "./MenuToggle";
import type { Url } from "@/shared/newUtils";


const useDimensions = (ref: MutableRefObject<any>) => {
  const dimensions = useRef({ width: 0, height: 0 })
  useEffect(() => {
    dimensions.current.width = ref.current.offsetWidth
    dimensions.current.height = ref.current.offsetHeight
  }, [])

  return dimensions.current
}



const sidebar = {
  open: (height = 1000) => ({
    clipPath: `circle(${height * 2 + 200}px at 40px 40px)`,
    transition: {
      type: 'spring',
      stiffness: 20,
      restDelta: 2
    }
  }),
  closed: {
    clipPath: 'circle(20px at 40px 33px)',
    transition: {
      delay: 0.5,
      type: 'spring',
      stiffness: 400,
      damping: 40
    }
  }
}


export const MobileNav = ({
  urls
}: {
  urls: Url[]
}) => {

  const [isOpen, toggleOpen] = useCycle(false, true)
  const containerRef = useRef(null)
  const { height } = useDimensions(containerRef)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
  }, [isOpen])


  return (

    <motion.nav

      animate={isOpen ? 'open' : 'closed'}
      custom={height}
      ref={containerRef}
      className=' nav w-min xl:hidden '
    >
      <motion.div className='background bg-interbrasGreen-500 ' variants={sidebar} />

      <Navigation
        urls={urls}
        isOpen={isOpen}
        toggleOpen={
          toggleOpen
        }
      />

      <MenuToggle toggle={() => toggleOpen()} />
    </motion.nav>

  );
}