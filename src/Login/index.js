import React from 'react'

import logo from '../assets/SFERA_AZUL.png'

import styles from './styles.module.css'

export default function Login(){
    return (
        <>
            <form className={styles.form}>
                <div className="row">
                    <div className="col text-center">
                        <img src={logo} className={styles.logo} alt="SFERA" />
                    </div>
                </div>
                <div className="row">
                    <div className="col text-center">
                        <h2 className={styles.title}>Sistema de Frequência Escolar e Registro Acadêmico</h2>
                    </div>
                </div>

                <div className="row">
                    <div className="col">
                        <div className="form-group">
                            <label>Usuário</label>
                            <input type="text" className="form-control" />
                        </div>

                        <div className="form-group">
                            <label>Senha</label>
                            <input type="text" className="form-control" />
                        </div>

                        <div className="form-group text-center">
                            <button type="button" className="btn btn-info">Acessar</button>
                        </div>
                    </div>
                </div>
            </form>
        </>
    )
}