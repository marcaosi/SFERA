import React from 'react'

import styles from './style.module.css'

import sfera from '../../assets/SFERA.png'

export default function Sidebar(){
    return (
        <section className={styles.container}>
            <img src={sfera} className={styles.logo} />
            <hr className={styles.divider} />
        </section>
    )
}