import { useState, useEffect } from 'react'
import styles from './Menu.module.css'
import Button from '../button/Button'

export default function Menu() {
  const [isFixedMenu, setFixedMenu] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight
      const totalScrollableHeight = documentHeight - windowHeight

      const progress = (scrollPosition / totalScrollableHeight) * 100
      setScrollProgress(progress)

      if (scrollPosition > 20) {
        setFixedMenu(true)
      } else {
        setFixedMenu(false)
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev)
  }

  return (
    <div className={`${styles.container_menu}  ${isFixedMenu ? styles.fixed_menu : ''}` }>
      <nav className={styles.menu}>
        <img className={styles.logo} src="/img/logo.svg" alt="logo.svg" />
        <Button className={styles.btn_mobile_menu} onClick={toggleMobileMenu}>
          <span className={`${isMobileMenuOpen ? styles.open_first : ''}`}></span>
          <span className={`${isMobileMenuOpen ? styles.open_second : ''}`}></span>
          <span className={`${isMobileMenuOpen ? styles.open_third : ''}`}></span>
        </Button>

        <ul className={`${styles.menu_list} ${isMobileMenuOpen ? styles.open : ''}`}>
          <li>
            <a href="#header">Главная</a>
          </li>
          <li>
            <a href="#timeline">О событии</a>
          </li>
          <li>
            <a href="#challenges">Кейсы</a>
          </li>
          <li>
            <a href="#benefits">Преимущества</a>
          </li>
          <li>
            <a href="#form">Регистрация</a>
          </li>
        </ul>
      </nav>
      <div
          className={styles.progress_bar}
          style={{ width: `${scrollProgress}%` }}
        ></div>
    </div>
  )
}

