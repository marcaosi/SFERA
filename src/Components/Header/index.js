import React from 'react'

import styles from './styles.module.css'
import { useHistory } from 'react-router-dom'

export default function Header(){
    const history = useHistory()
    return (
        <header className={styles.header + " row"}>
            <div className="col">
                <span>
                    Olá, Usuário!
                </span>
            </div>
            <div className="col text-right">
                <span>
                    <a href="/" onClick={(event) => {
                        event.preventDefault()
                        localStorage.removeItem("jwt")
                        history.push("/login")
                    }} className={styles.logout}>Sair</a>
                </span>
            </div>
        </header>
    )
}