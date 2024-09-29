import { useEffect } from 'react'
import styles from './Header.module.css'
import Container from '../container/Container'
import Menu from '../menu/Menu'
import Basic_animate_element from '../animate/basic_animate_element/Basic_animate_element'


export default function Header () {

    useEffect(() => {
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
          }, 2000)
        }
    
        animateRandomLetter()
      }, [])
    


    return (
        <header id='header' className={styles.header}>

                <div className={styles.wrapper_header}>
                    <Menu />
                    <div className={styles.header_content}>
                    <Basic_animate_element direction="top" offset={100}>
                    <h1>ПРИСОЕДИНЯЙТЕСЬ К ЗАХВАТЫВАЮЩЕМУ ХАКАТОНУ</h1>
                    </Basic_animate_element>
                    <Basic_animate_element direction="bottom" offset={100}>
                        <p>Добро пожаловать на «Хакатон Колледжей Москвы - Московский Транспорт»</p>
                    </Basic_animate_element>
                    </div>
                    <Basic_animate_element direction="zoom-in" offset={100}>
                        <h3 className={styles.name_brand}>
                            <span>Х</span>
                            <span>а</span>
                            <span>к</span>
                            <span>а</span>
                            <span>т</span>
                            <span>о</span>
                            <span>н</span>
                        </h3>
                    </Basic_animate_element>
                    <div className={styles.triangle}></div>
                    <div className={styles.triangle}></div>
                    <div className={styles.triangle}></div>
                </div>
            <div className={styles.wrapper_organizers}>
                <Container>
                    <div className={styles.organizers}>
                        <img src="/img/logo_organizers.svg" alt="logo_organizers" />
                        <span>IT НАЧИНАЕТСЯ ЗДЕСЬ!</span>
                    </div>
                </Container>
            </div>
        </header>
    )
}