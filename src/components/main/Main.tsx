// import styles from "./Main.module.css"
import Benefits from "../benefits/Benefits"
import Challenges from "../challenges/Challenges"
import Timeline from "../timeline/Timeline"
import Form_registration from "../form_registration/Form_registration"

export default function Main() {
    return (
        <main>
            <Timeline />
            <Challenges />
            <Benefits />
            <Form_registration />
        </main>
    )
}