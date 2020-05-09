import React from 'react'

import Title from '../Components/Title'

import styles from './styles.module.css'

export default function NovoColaborador(){
    return (
        <>
            <Title>Adicionar nova sala de aula</Title>

            <div className="row">
                <div className="col">
                    <form className={ styles.form }>
                        <div className="form-group">
                            <label>Ano</label>
                            <input type="number" className="form-control" />
                        </div>

                        <div className="form-group">
                            <label>Descrição</label>
                            <textarea className="form-control" placeholder="Berçário I"></textarea>
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