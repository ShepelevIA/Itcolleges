import styles from './Benefits.module.css'           
import Container from '../container/Container'
import Basic_animate_element from '../animate/basic_animate_element/Basic_animate_element'

export default function Benefits() {
    return (
        <section id="benefits">
            <Container>
                <h2>Что вы получите?</h2>
                <div className={styles.wrapper_benefits}>
                    <div className={styles.benefits_content}>
                        <ul className={styles.list_get_opportunity}>
                            <Basic_animate_element direction="top" offset={200}>
                            <li>Возможность проявить свои таланты.</li>
                            </Basic_animate_element>
                            <Basic_animate_element direction="left" offset={200}>
                            <li>Шанс на стажировку в Московском транспорте.</li>
                            </Basic_animate_element>
                            <Basic_animate_element direction="right" offset={200}>
                            <li>Лимитированные карты "Тройка".</li>
                            </Basic_animate_element>
                            <Basic_animate_element direction="bottom" offset={50}>
                            <li> Наградной материал и фирменный мерч.</li>
                            </Basic_animate_element>
                        </ul>
                        <Basic_animate_element direction="bottom" offset={50}>
                        <p>
                            Не упустите возможность стать частью этого захватывающего события!
                        </p>
                        </Basic_animate_element>
                    </div>
                </div>
            </Container>
        </section>
    )
}