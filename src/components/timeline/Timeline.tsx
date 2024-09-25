import styles from './Timeline.module.css'
import Container from '../container/Container'

export default function Timeline() {
    return (
        <section id="timeline">
            <Container>
                <h2>Описание мероприятия</h2>
                <div className={styles.wrapper_timeline}>
                    <div className={styles.wrapper_when}>
                        <h3>Когда:</h3>
                        <span>1</span>
                        <span>2</span>
                        <span>Октября</span>
                    </div>
                    <div className={styles.wrapper_where}>
                    <img src="/img/get_opportunity.svg" alt="get_opportunity" />
                        <div className={styles.where_content}>
                        <h3>Где:</h3>
                            <p> м. Кунцевская, Ул. Ивана Франко, д. 14</p>
                            <h3>Кто участвует:</h3>
                            <p>12 команд студентов IT-колледжей Москвы.
                            <br />
                            60 студентов 2–3 курсов.
                            </p>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    )
}