import { useEffect } from 'react'
import { usePreloader } from '../../Context/PreloaderContext/PreloaderContext'
import styles from './Preloader.module.css'

export default function Preloader() {
    const { loading } = usePreloader()

    if (loading) {
      document.body.style.overflow = 'hidden'
  } else {
      document.body.style.overflow = 'auto'
  }

    useEffect(() => {
        if (!loading) return

        const letters = document.querySelectorAll(`.${styles.name_brand} span`)

        function animateRandomLetter() {
            letters.forEach(letter => {
                letter.classList.remove(`${styles.bounce_letter}`)
            })

            const randomIndex = Math.floor(Math.random() * letters.length)
            const randomLetter = letters[randomIndex]

            randomLetter.classList.add(`${styles.bounce_letter}`)

            setTimeout(() => {
                randomLetter.classList.remove(`${styles.bounce_letter}`)
                animateRandomLetter()
            }, 500)
        }

        animateRandomLetter()
    }, [loading])

 
    if (!loading) return null

    return (
        <div className={styles.preloader_overlay}>
            <h3 className={styles.name_brand}>
                <span>Х</span>
                <span>а</span>
                <span>к</span>
                <span>а</span>
                <span>т</span>
                <span>о</span>
                <span>н</span>
            </h3>
            <div className={styles.spinner}></div>
        </div>
    )
}
