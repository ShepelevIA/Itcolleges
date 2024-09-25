import styles from './Benefits.module.css'           
import Container from '../container/Container'

export default function Benefits() {
    return (
        <section id="benefits">
            <Container>
                <h2>Что вы получите?</h2>
                <div className={styles.wrapper_benefits}>
                    <div className={styles.benefits_content}>
                        <ul className={styles.list_get_opportunity}>
                            <li>Возможность проявить свои таланты.</li>
                            <li>Шанс на стажировку в Московском транспорте.</li>
                            <li>Лимитированные карты "Тройка".</li>
                            <li> Наградной материал и фирменный мерч.</li>
                        </ul>
                        <p>
                            Не упустите возможность стать частью этого захватывающего события!
                        </p>
                    </div>
                </div>
            </Container>
        </section>
    )
}