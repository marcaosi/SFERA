import React from 'react'

import Title from '../Components/Title'

import styles from './styles.module.css'

export default function NovoColaborador(){
    return (
        <>
            <Title>Adicionar novo setor de trabalho</Title>

            <div className="row">
                <div className="col">
                    <form className={ styles.form }>
                        <div className="form-group">
                            <label>Nome</label>
                            <input type="text" className="form-control" />
                        </div>

                        <div className="form-group text-center">
                            <button className="btn btn-primary btn-lg" type="button">Salvar</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}