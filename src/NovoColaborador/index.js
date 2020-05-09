import React from 'react'

import Title from '../Components/Title'

import styles from './styles.module.css'

export default function NovoColaborador(){
    return (
        <>
            <Title>Adicionar novo colaborador</Title>

            <div className="row">
                <div className="col">
                    <form className={ styles.form }>
                        <div className="form-group">
                            <label>Nome</label>
                            <input type="text" className="form-control" />
                        </div>

                        <div className="form-group">
                            <label>Data de nascimento</label>
                            <input type="date" className="form-control" />
                        </div>

                        <div className="form-group">
                            <label>Matrícula</label>
                            <input type="text" className="form-control" />
                        </div>

                        <div className="form-group">
                            <label>Documento</label>
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