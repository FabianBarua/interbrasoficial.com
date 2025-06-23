import { motion } from "framer-motion"
import { getRelativeLocaleUrl } from 'astro:i18n'
import { getLangFromUrl } from "@/i18n/utils"


interface MenuItemProps {
  selected: boolean
  title: string
  variants: any
  onClick: () => void
  link?: string
}

export const MenuItem: React.FC<MenuItemProps> = ({ title, variants, onClick, selected, link }) => {

  const lang = getLangFromUrl(
    new URL(window.location.href)
  )


  if (link !== undefined) {
    return (
      <motion.li
        variants={variants}
        className={
          `
            cursor-pointer
            ${selected ? 'text-white' : 'text-white/50'}
            `
        }
        onClick={
          onClick
        }

      >
        <a hrefLang={lang === "pt" ? "pt-BR" : lang || "es"} href={
          getRelativeLocaleUrl(
            lang,
            link
          )
        }>
          {title}
        </a>
      </motion.li>
    )
  }

  return (
    <motion.li
      onClick={onClick}
      variants={variants}
      className={
        `
          cursor-pointer
          ${selected ? 'text-white' : 'text-white/50'}
          `
      }

    >
      {title}
    </motion.li>
  )
}
