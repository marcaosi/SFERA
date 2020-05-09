import React from 'react'

import styles from './styles.module.css'

export default function Content({ children }){
    return (
        <section className={styles.content + " col"}>
            { children }
        </section>
    )
}