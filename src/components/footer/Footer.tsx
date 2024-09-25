import styles from './Footer.module.css'
import Container from '../container/Container'

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <Container>
                <span>itcolleges.ru 2024</span>
            </Container>
        </footer>
    )
}