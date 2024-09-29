import { useState, useEffect, ChangeEvent } from 'react'
import styles from './Form_registration.module.css'
import Container from '../container/Container'
import { IMaskInput } from 'react-imask'
import Input from '../input/Input'
import Select from '../select/Select'
import Button from '../button/Button'
import Modal from '../modal/Modal'
import Tooltip from '../tooltip/Tooltip'

interface Person {
    lastName: string
    firstName: string
    middleName: string
    email: string
    phoneNumber: string    
    dateOfBirth: string
    age: string
    telegramNickname: string    
    educationalInstitution: string
    specialty: string    
}

interface Case {
    caseId: number
    caseName: string
    recordCount: number
    isAvailable: boolean
}


interface FormData {
    teamName: string
    case: string
    captain: Person
    members: Person[]
    mentor: Person
}

const createEmptyPerson = (): Person => ({
    lastName: '',
    firstName: '',
    middleName: '',
    email: '',
    phoneNumber: '',   
    dateOfBirth: '',
    age: '',
    telegramNickname: '',   
    educationalInstitution: '',
    specialty: '',   
})

export default function FormRegistration() {
    const [availableCases, setAvailableCases] = useState<Case[]>([])
    const [step, setStep] = useState<number>(1)
    const [formData, setFormData] = useState<FormData>({
        teamName: '',
        case: '',
        captain: createEmptyPerson(),
        members: [createEmptyPerson()],
        mentor: createEmptyPerson(),
    })

    const [errors, setErrors] = useState<{ captain: string[], members: string[][], mentor: string[] }>({
        captain: [],
        members: [],
        mentor: []
    })

    const [isModalOpen, setIsModalOpen] = useState(false)
    const [modalMessage, setModalMessage] = useState<string>('')
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [modalHeading, setModalHeading] = useState<string>('')

    useEffect(() => {
        initializeTeamMembers(1)

        fetch('https://api.itcolleges.ru/api/Cases/Available')
            .then((response) => response.json())
            .then((data: Case[]) => {
                setAvailableCases(data.filter(c => c.isAvailable))
            })
            .catch(() => {
                setModalMessage('Ошибка загрузки кейсов')
                setIsModalOpen(true)
            })
    }, [])

    useEffect(() => {
        initializeTeamMembers(1)
    }, [])

    const initializeTeamMembers = (size: number) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            members: Array(size).fill(createEmptyPerson()),
        }))
    }

    const addMember = () => {
        if (formData.members.length < 4) { 
            setFormData((prevData) => ({
                ...prevData,
                members: [...prevData.members, createEmptyPerson()],
            }))
        }
    }

    const removeMember = (index: number) => {
        const updatedMembers = formData.members.filter((_, i) => i !== index)
        setFormData((prevData) => ({
            ...prevData,
            members: updatedMembers,
        }))
    }
    
    const handleInputChange = (
        e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
        section?: 'captain' | 'mentor' | 'members',
        index?: number
    ) => {
        const { name, value } = e.target
    
        if (name === 'age' && parseInt(value) < 0) return
    

        if (['lastName', 'firstName', 'middleName'].includes(name) && !validateRussianText(value)) {
            return
        }
    
    
        if (['educationalInstitution', 'specialty'].includes(name) && !validateRussianTextWithSymbols(value)) {
            return
        }
    
        if (!section) {
            setFormData((prevData) => ({
                ...prevData,
                [name]: value,
            }))
        } else if (section === 'members' && index !== undefined) {
            const newMembers = [...formData.members]
            newMembers[index] = { ...newMembers[index], [name]: value }
            setFormData((prevData) => ({
                ...prevData,
                members: newMembers,
            }))
        } else {
            setFormData((prevData) => ({
                ...prevData,
                [section]: {
                    ...prevData[section],
                    [name]: value,
                },
            }))
        }
    }
    

    const validateEmail = (email: string) => {
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
        return emailPattern.test(email)
    }

    const validateRussianText = (text: string) => {
        if (text === '') return true 
        return /^[А-Яа-яЁё\s-]+$/.test(text)
    }

    const validateRussianTextWithSymbols = (text: string) => {
        if (text === '') return true 
        return /^[А-Яа-яЁё0-9\s().,:%№"!_+-]+$/.test(text) 
    }    

    const fieldLabels: { [key: string]: string } = {
        lastName: 'Фамилия',
        firstName: 'Имя',
        middleName: 'Отчество',
        email: 'Почта',
        phoneNumber: 'Телефон',
        dateOfBirth: 'Дата рождения',
        age: 'Возраст',
        telegramNickname: 'Никнейм в Telegram',
        educationalInstitution: 'Учебное заведение',
        specialty: 'Специальность',
    }

    const validateStep = () => {
        const newErrors: { captain: string[], members: string[][], mentor: string[] } = {
            captain: [],
            members: [],
            mentor: []
        }
    
        if (step === 1) {
            if (!formData.teamName.trim()) {
                newErrors.captain.push('Название команды - обязательное поле')
            }
            if (!formData.case.trim()) {
                newErrors.captain.push('Кейс - обязательное поле')
            }
        }
    
        if (step === 2) {
            Object.entries(formData.captain).forEach(([key, value]) => {
                const label = fieldLabels[key] || key
                if (!value.trim()) newErrors.captain.push(`${label} - обязательное поле`)
                if (key === 'email' && !validateEmail(value)) {
                    newErrors.captain.push(`${label.toLowerCase()} - неверный формат`)
                }
            })
        }
    
        if (step === 3) {
            formData.members.forEach((member) => {
                const memberErrors: string[] = []
                Object.entries(member).forEach(([key, value]) => {
                    const label = fieldLabels[key] || key
                    if (!value.trim()) memberErrors.push(`${label} обязательное поле`)
                    if (key === 'email' && !validateEmail(value)) {
                        memberErrors.push(`Неверный формат ${label.toLowerCase()}`)
                    }
                })
                if (memberErrors.length > 0) {
                    newErrors.members.push(memberErrors)
                }
            })
        }
    
        if (step === 4) {
            Object.entries(formData.mentor).forEach(([key, value]) => {
                const label = fieldLabels[key] || key
                if (!value.trim()) newErrors.mentor.push(`${label} обязательное поле`)
                if (key === 'email' && !validateEmail(value)) {
                    newErrors.mentor.push(`Неверный формат ${label.toLowerCase()}`)
                }
            })
        }
    
        setErrors(newErrors)
        return newErrors.captain.length === 0 && newErrors.members.length === 0 && newErrors.mentor.length === 0
    }
    
    
    const handleNextStep = () => {
        if (validateStep()) {
            setIsLoading(true)
            setTimeout(() => {
                setStep(step + 1)
                setIsLoading(false)
                setModalHeading('') 
            }, 1000)
        } else {
            setModalHeading('Ошибки при заполнении')
            setIsModalOpen(true)
        }
    }

    const handlePrevStep = () => {
        if (step > 1) {
            setIsLoading(true)
        setTimeout(() => {
            setStep(step - 1)
            setIsLoading(false)
        }, 1000)
        }
    }

    const handleSubmit = () => {
        if (validateStep()) {
            const payload = {
                teamName: formData.teamName,
                caseId: parseInt(formData.case, 10),
                participants: [
                    {
                        lastName: formData.captain.lastName,
                        firstName: formData.captain.firstName,
                        middleName: formData.captain.middleName,
                        dateOfBirth: new Date(formData.captain.dateOfBirth).toISOString(),
                        age: parseInt(formData.captain.age, 10),
                        email: formData.captain.email,
                        phoneNumber: formData.captain.phoneNumber,
                        telegramNickname: formData.captain.telegramNickname,
                        educationalInstitution: formData.captain.educationalInstitution,
                        specialty: formData.captain.specialty,
                        statusId: 1,
                    },
                    ...formData.members.map((member) => ({
                        lastName: member.lastName,
                        firstName: member.firstName,
                        middleName: member.middleName,
                        dateOfBirth: new Date(member.dateOfBirth).toISOString(),
                        age: parseInt(member.age, 10),
                        email: member.email,
                        phoneNumber: member.phoneNumber,
                        telegramNickname: member.telegramNickname,
                        educationalInstitution: member.educationalInstitution,
                        specialty: member.specialty,
                        statusId: 2,
                    })),
                    {
                        lastName: formData.mentor.lastName,
                        firstName: formData.mentor.firstName,
                        middleName: formData.mentor.middleName,
                        dateOfBirth: new Date(formData.mentor.dateOfBirth).toISOString(),
                        age: parseInt(formData.mentor.age, 10),
                        email: formData.mentor.email,
                        phoneNumber: formData.mentor.phoneNumber,
                        telegramNickname: formData.mentor.telegramNickname,
                        educationalInstitution: formData.mentor.educationalInstitution,
                        specialty: formData.mentor.specialty,
                        statusId: 3,
                    },
                ],
            }
    
            fetch('https://api.itcolleges.ru/api/Teams/Register', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
              })
                .then(async response => {
                  const data = await response.json()
    
                  if (!response.ok) {    
                    setModalHeading(data.message)
                    setModalMessage(data.innerException)
                    setIsModalOpen(true)
                    return
                  }
                  return data
                })
                .then(data => {
                  if (data) {
                    // console.log('Success:', data)
                    setIsSubmitted(true)
                    setModalHeading('Регистрация завершена')
                    setModalMessage(data.message || 'Команда успешно зарегистрирована.')
                    setIsModalOpen(true)
                  }
                })
                .catch((error) => {
                  console.error('Error:', error.message)
                  setModalHeading('Ошибка при отправке')
                  setModalMessage(error.message || 'Произошла ошибка при регистрации команды.')
                  setIsModalOpen(true)
                })
        } else {
            setModalHeading('Ошибки при заполнении') 
            setModalMessage('Есть ошибки при заполнении формы.')
            setIsModalOpen(true)
        }
    }    

    const renderStepContent = () => {
        if (isSubmitted) {
            return (
            <div className={styles.message_close_form}> 
              <h3 className={styles.end_form}>Спасибо за регистрацию!</h3>
            </div>
        )
        }

        if (availableCases.length === 0) {
            return (
            <div className={styles.message_close_form}>
            <h3 className={styles.end_form}>Все команды по кейсам собраны!</h3>
            <p className={styles.end_form}>Регистрация команд закончена.</p>
            </div>
            )
        }

        switch (step) {
            case 1:
                return (
                    <div className={styles.step_one}>
                        <h3>Шаг 1: Введите название команды и выберите кейс</h3>
                        <Tooltip message="Название Комады может быть как на русском, так и на английском языке.">
                            <Input
                                label="Название Команды"
                                definitely_field={true}
                                name="teamName"
                                placeholder="Teams name"
                                value={formData.teamName}
                                onChange={(e) => handleInputChange(e)}
                            />
                        </Tooltip>
                        <Tooltip message="Кейсы обезательное поле">
                        <Select
                            label="Кейс"
                            definitely_field={true}
                            name="case"
                            value={formData.case}
                            onChange={(e) => handleInputChange(e)}
                        >
                            <option value="">Выберите кейс</option>
                            {availableCases.map((availableCase) => (
                                <option key={availableCase.caseId} value={availableCase.caseId}>
                                    {availableCase.caseName}
                                </option>
                            ))}
                        </Select>
                        </Tooltip>
                        <div className={styles.btn_form_control}>
                            <Button onClick={handleNextStep}>Далее</Button>
                        </div>
                    </div>
                )
            case 2:
                return (
                    <div className={styles.step_two_three_four}>
                        <h3>Шаг 2: Введите данные капитана команды</h3>
                        <PersonForm
                            personData={formData.captain}
                            section="captain"
                            handleInputChange={handleInputChange}
                            validateEmail={validateEmail}
                        />
                        <div className={styles.btn_form_control}>
                            <Button onClick={handlePrevStep}>Назад</Button>
                            <Button onClick={handleNextStep}>Далее</Button>
                        </div>
                    </div>
                )
            case 3:
                return (
                    <div className={styles.step_two_three_four}>
                        <h3>Шаг 3: Введите данные участников команды</h3>
                        {formData.members.map((member, index) => (
                            <div key={index}>
                                <p className={styles.participant}>Участник {index + 1}</p>
                                {formData.members.length > 1 && (
                                    <Button onClick={() => removeMember(index)}>Удалить</Button>
                                )}
                                <PersonForm
                                    personData={member}
                                    section="members"
                                    handleInputChange={handleInputChange}
                                    index={index}
                                    validateEmail={validateEmail}
                                />
                            </div>
                        ))}

                        <div className={styles.btn_form_control}>
                            {formData.members.length < 4 && (
                                <Button onClick={addMember}>Добавить участника</Button>
                            )}
                            <Button onClick={handlePrevStep}>Назад</Button>
                            <Button onClick={handleNextStep}>Далее</Button>
                        </div>
                    </div>
                )
            case 4:
                return (
                    <div className={styles.step_two_three_four}>
                        <h3>Шаг 4: Введите данные наставника</h3>
                        <PersonForm
                            personData={formData.mentor}
                            section="mentor"
                            handleInputChange={handleInputChange}
                            validateEmail={validateEmail}
                        />
                        <div className={styles.btn_form_control}>
                            <Button onClick={handlePrevStep}>Назад</Button>
                            <Button onClick={handleSubmit}>Отправить заявку</Button>
                        </div>
                    </div>
                )
        }
    }

    return (
        <section id="form">
        <Container>
            <div className={styles.form}>
                <h2>Форма подачи заявки</h2>
                {isLoading ? (
                    <div className={styles.preloader_form}>
                        <div className={styles.spinner}></div>
                    </div>
                ) : (
                    renderStepContent()
                )}
                <Modal heading={modalHeading} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                    {Object.keys(errors).length > 0 && (
                        <>
                            {errors.captain.length > 0 && (
                                <>
                                    <h3>Капитан:</h3>
                                    <ol>
                                        {errors.captain.map((error, index) => (
                                            <li key={index}>{error}</li>
                                        ))}
                                    </ol>
                                </>
                            )}
                            {errors.members.length > 0 && (
                                <>
                                    {errors.members.map((memberErrors, index) => (
                                        <div key={index}>
                                            <h3>Участник {index + 1}:</h3>
                                            <ol>
                                                {memberErrors.map((error, errorIndex) => (
                                                    <li key={errorIndex}>{error}</li>
                                                ))}
                                            </ol>
                                        </div>
                                    ))}
                                </>
                            )}
                            {errors.mentor.length > 0 && (
                                <>
                                    <h3>Наставник:</h3>
                                    <ol>
                                        {errors.mentor.map((error, index) => (
                                            <li key={index}>{error}</li>
                                        ))}
                                    </ol>
                                </>
                            )}
                        </>
                    ) }
                    {modalMessage && (
                        <p>{modalMessage}</p>
                    )}
                </Modal>
            </div>
        </Container>
    </section>
    )
}

interface PersonFormProps {
    personData: Person
    section: 'captain' | 'mentor' | 'members'
    handleInputChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>, section: 'captain' | 'mentor' | 'members', index?: number) => void
    index?: number
    validateEmail: (email: string) => boolean
}

function PersonForm({
    personData,
    section,
    handleInputChange,
    index,
}: PersonFormProps) {
    return (
        <>
            <div className={styles.input_group}>
                <Tooltip message="Ввод только на русском языке">
                    <Input
                        label="Фамилия"
                        definitely_field={true}
                        name="lastName"
                        placeholder="Иванов"
                        value={personData.lastName}
                        onChange={(e) => handleInputChange(e, section, index)}
                    />
                </Tooltip>
                <Tooltip message="Ввод только на русском языке">
                    <Input
                        label="Имя"
                        definitely_field={true}
                        name="firstName"
                        placeholder="Иван"
                        value={personData.firstName}
                        onChange={(e) => handleInputChange(e, section, index)}
                    />
                </Tooltip>
                <Tooltip message="Ввод только на русском языке">
                    <Input
                        label="Отчество"
                        definitely_field={true}
                        name="middleName"
                        placeholder="Иванович"
                        value={personData.middleName}
                        onChange={(e) => handleInputChange(e, section, index)}
                    />
                </Tooltip>
            </div>
            <div className={styles.input_group}>
                <Tooltip message="Номер уникальное поле (не должен повторяться)">
                <div className={styles.input_mask}>
                    <label>
                        Телефон 
                        <span className={styles.definitely_field}>*</span>
                    </label>
                    <IMaskInput
                        mask="+7(000) 000-00-00"
                        value={personData.phoneNumber}   
                        onAccept={(value: string) => handleInputChange({ target: { name: 'phoneNumber', value } } as any, section, index)}
                        name="phoneNumber"   
                        placeholder="+7(999)-999-99-99"
                        type="tel"
                        className={styles.input}
                    />
                </div>
                </Tooltip>
                <Tooltip message="Дата обезательное поле">
                <div className={styles.input_mask}>
                    <label>
                        Дата рождения
                        <span className={styles.definitely_field}>*</span>
                    </label>
                    <IMaskInput
                        mask="00.00.0000"
                        value={personData.dateOfBirth}
                        onAccept={(value: string) => handleInputChange({ target: { name: 'dateOfBirth', value } } as any, section, index)}
                        name="dateOfBirth"
                        placeholder="ДД.ММ.ГГГГ"
                        className={styles.input}
                    />
                </div>
                </Tooltip>
                <Tooltip message="Возраст обезательное поле">
                    <Input
                        label="Возраст"
                        definitely_field={true}
                        type="number"
                        name="age"
                        placeholder="16 и больше"
                        value={personData.age}
                        onChange={(e) => handleInputChange(e, section, index)}
                        min={16}
                    />
                </Tooltip>
            </div>
            <div className={styles.input_group}>
            <Tooltip message="Почта уникальное поле (не должена повторяться)">
                <Input
                    label="Почта"
                    definitely_field={true}
                    type="email"
                    name="email"
                    placeholder="example@mail.com"
                    value={personData.email}
                    onChange={(e) => handleInputChange(e, section, index)}
                />
                </Tooltip>
                <Tooltip message="Никнейм уникальное поле (не должен повторяться). Ввод только на английском языке. Никнейм должен начинаться с @">
                    <Input
                        label="Никнейм в Telegram"
                        definitely_field={true}
                        name="telegramNickname"   
                        placeholder="@telegram_nickname"
                        value={personData.telegramNickname}   
                        onChange={(e) => handleInputChange(e, section, index)}
                        className={styles.input}
                    />
                </Tooltip>
            </div>
            <div className={styles.input_group}>
                <Tooltip message="Ввод только на русском языке">
                    <Input
                        label="Учебное заведение"
                        definitely_field={true}
                        name="educationalInstitution"
                        placeholder="ГБПОУ МГКЭИТ"
                        value={personData.educationalInstitution}
                        onChange={(e) => handleInputChange(e, section, index)}
                    />
                </Tooltip>
                <Tooltip message="Ввод только на русском языке">
                    <Input
                        label="Специальность по направлению IT"
                        definitely_field={true}
                        name="specialty"  
                        placeholder="09.02.07 «Информационные системы и программирование»"
                        value={personData.specialty}  
                        onChange={(e) => handleInputChange(e, section, index)}
                    />
                </Tooltip>
            </div>
        </>
    )
}

