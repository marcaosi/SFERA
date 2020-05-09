import React from 'react'

import styles from './styles.module.css'

export default function Title({ children }){
    return (
        <div className="row">
            <div className="col">
                <h1 className={styles.title}>{children}</h1>
            </div>
        </div>
    )
}