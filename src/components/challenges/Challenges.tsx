import { useState } from 'react'
import styles from './Challenges.module.css'
import Container from '../container/Container'
import Card from '../cards/Card'
import Modal from '../modal/Modal'
import Button from '../button/Button'

export default function Challenges() {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [modalContent, setModalContent] = useState<React.ReactNode | null>(null)
    const [modalHeading, setModalHeading] = useState<string>('')

    const handleCardClick = (heading: string, content: React.ReactNode) => {
        setModalHeading(heading) 
        setModalContent(content) 
        setIsModalOpen(true) 
    }

    const handleCloseModal = () => {
        setIsModalOpen(false)
        setModalContent(null)
        setModalHeading('') 
    }

    return (
        <section id="challenges">
            <Container>
                <h2>Кейсы хакатона</h2>
                <div className={styles.cards}>
                    <Card 
                        className={styles.card_challenge} 
                        border="5px solid rgb(1, 65, 199)"
                        onClick={() => handleCardClick(
                            'Система управления движением транспортного средства', 
                            <div>
                                <p>
                                    <br />
                                    <span style={{ fontWeight: 800 }}>Стек:</span> Python, Numpy, Matplotlib, Matlab, Теория управления, ROS2, Linux
                                    <br />
                                    <br />
                                    <span style={{ fontWeight: 800 }}>Описание:</span>
                                    <br />
                                    Разработать систему управления движением транспортного средства на основе ПИ регулятора и математической модели продольной динамики, которая будет осуществлять точное следование заданной траектории движения.
                                    <br />
                                    <br />
                                    <span style={{ fontWeight: 800 }}>Предполагаемый результат:</span>
                                    <br />
                                    Математическая модель объекта управления с возможностью моделировать внешние возмущения и визуализацией, а также, регулятор, позволяющий осуществлять точное регулирование заданной траектории движения транспортного средства и компенсировать внешние возмущения.
                                </p>
                            </div>
                        )}
                    >
                        <div className={styles.card_content}>
                            <h3>Система управления движением транспортного средства</h3>
                            <Button className={styles.btn_challenges}>Подробнее</Button>
                        </div>
                        <img src="/img/motion_control_system.svg" alt="motion_control_system" />
                    </Card>

                    <Card 
                        className={styles.card_challenge} 
                        border="5px solid rgb(213, 17, 37)"
                        onClick={() => handleCardClick(
                            'Тестирование',
                            <div>
                                <p>
                                    <br />
                                    <span style={{ fontWeight: 800 }}>Стек:</span> ROS2, Gazebo, Linux, Python, Bash, Git, Тестирование
                                    <br />
                                    <br />
                                    <span style={{ fontWeight: 800 }}>Описание:</span>
                                    <br />
                                    Проведение экспериментов и тестирование работоспособности на модели робота TurtleBot в Gazebo. Разработка тест-кейсов, анализ и выявление неисправностей работы системы.
                                    <br />
                                    <br />
                                    <span style={{ fontWeight: 800 }}>Предполагаемый результат:</span>
                                    <br />
                                    </p>
                                    <ul>
                                        <li>Установлена среда и проект с системой навигацией робота в Gazebo. </li>
                                        <li>Проведены испытания, выявлены недостатки подсистем робота и описан результат работы. </li>
                                        <li>Зафиксированы логи с проездов робота и проанализированы.</li>
                                    </ul>
                            </div>
                        )}
                    >
                        <div className={styles.card_content}>
                            <h3>Тестирование</h3>
                            <Button className={styles.btn_challenges}>Подробнее</Button>
                        </div>
                        <img src="/img/testing.svg" alt="testing" />
                    </Card>

                    <Card 
                        className={styles.card_challenge} 
                        border="5px solid rgb(73, 120, 219)"
                        onClick={() => handleCardClick(
                            'Планирование траектории', 
                            <div>
                                <p>
                                    <br />
                                    <span style={{ fontWeight: 800 }}>Стек:</span> С++, Python, ROS2, Rviz2, Lanelet2
                                    <br />
                                    <br />
                                    <span style={{ fontWeight: 800 }}> Описание:</span>
                                    <br />
                                    Разработать модуль планирования траектории движения транспортного средства на базе ROS2, позволяющий строить маршрут из одной произвольной точки на карте в другую, а также иметь визуализацию построенного маршрута. 
                                    <br />
                                    <br />
                                    <span style={{ fontWeight: 800 }}>Предполагаемый результат:</span>
                                    <br />
                                    Разработан универсальный алгоритм построения траектории движения в произвольные точки на карте, а также, модуль обработки векторной карты и визуализации объекта управления, который осуществляет перемещение по построенному маршруту.
                                </p>
                            </div>
                        )}
                    >
                        <div className={styles.card_content}>
                            <h3>Планирование траектории</h3>
                            <Button className={styles.btn_challenges}>Подробнее</Button>
                        </div>
                        <img src="/img/path_planning.svg" alt="path_planning" />
                    </Card>                                         
                </div>
                <br />
                <br />
            </Container>

            <Modal heading={modalHeading} isOpen={isModalOpen} onClose={handleCloseModal}>
                {modalContent}
            </Modal>
        </section>
    )
}
