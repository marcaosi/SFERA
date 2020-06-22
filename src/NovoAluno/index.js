import React, { useState } from 'react'

import Title from '../Components/Title'
import axios from '../Service/Axios'
import swal from 'sweetalert'

import styles from './styles.module.css'

export default function NovoAluno(){

    const [data, setData] = useState({
        nome: "",
        nascimento: "",
        mae: "",
        documento: "",
        pai: "",
        contato: ""
    })

    const handleChangeText = (event) => {
        setData({
            ...data,
            [event.target.name] : event.target.value
        })
    }

    const handleSubmitForm = (event) => {
        event.preventDefault()

        const aluno = data
        const date = data.nascimento.split("-")
        console.log(date)
        aluno.nascimento = `${date[2]}/${date[1]}/${date[0]}`

        axios
            .post("aluno", aluno)
            .then(data => {
                swal("Dados salvos com sucesso.")
            })
            .catch(err => {
                swal("Falha ao salvar, verifique os dados e tente novamente.")
            })
    }

    return (
        <>
            <Title>Adicionar novo aluno</Title>

            <div className="row">
                <div className="col">
                    <form className={ styles.form } onSubmit={handleSubmitForm}>
                        <div className="form-group">
                            <label>Nome</label>
                            <input 
                                type="text" 
                                className="form-control"
                                name="nome"
                                value={data.nome}
                                onChange={handleChangeText}
                             />
                        </div>

                        <div className="form-group">
                            <label>Data de nascimento</label>
                            <input 
                                type="date" 
                                className="form-control"
                                name="nascimento"
                                value={data.nascimento}
                                onChange={handleChangeText}
                             />
                        </div>

                        <div className="form-group">
                            <label>Nome da mãe</label>
                            <input 
                                type="text" 
                                className="form-control"
                                name="mae"
                                value={data.mae}
                                onChange={handleChangeText}
                             />
                        </div>

                        <div className="form-group">
                            <label>Nome do Pai</label>
                            <input 
                                type="text" 
                                className="form-control"
                                name="pai"
                                value={data.pai}
                                onChange={handleChangeText}
                             />
                        </div>

                        <div className="form-group">
                            <label>Documento</label>
                            <input 
                                type="text" 
                                className="form-control"
                                name="documento"
                                value={data.documento}
                                onChange={handleChangeText}
                             />
                        </div>

                        <div className="form-group">
                            <label>Contato</label>
                            <input 
                                type="text" 
                                className="form-control"
                                name="contato"
                                value={data.contato}
                                onChange={handleChangeText}
                             />
                        </div>

                        <div className="form-group text-center">
                            <button className="btn btn-primary btn-lg" type="submit">Salvar</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}