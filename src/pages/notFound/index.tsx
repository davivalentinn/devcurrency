import styles from './notFound.module.css'
import { Link } from 'react-router-dom'
export function NotFound(){
    return (
        <div className={styles.container}>
            <h1>Ops... Essa Página não existe</h1>
            <Link to={"/"} className={styles.link}>Voltar para Página Principal</Link>
        </div>
    )
}