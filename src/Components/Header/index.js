import React from 'react'

import styles from './styles.module.css'

export default function Header(){
    return (
        <header className={styles.header + " row"}>
            <div className="col">
                <span>
                    Olá, Usuário!
                </span>
            </div>
            <div className="col text-right">
                <span>
                    <a href="/" className={styles.logout}>Sair</a>
                </span>
            </div>
        </header>
    )
}