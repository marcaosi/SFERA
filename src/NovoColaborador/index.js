import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import Title from '../Components/Title'
import axios from '../Service/Axios'
import swal from 'sweetalert'
import RandomString from '../Utils/RandomString'

import styles from './styles.module.css'

export default function NovoColaborador(){

    const { id } = useParams()

    useEffect(() => {
        if(id){
            axios.get(`colaborador/${id}`)
                .then(({data}) => setData({
                    ...data,
                    ...(data.data)[0]
                }))
                .catch((err) => swal("Falha ao carregar dados. Recarregue a página."))
        }
    }, [id])

    const [data, setData] = useState({
        nome: "",
        nascimento: "",
        matricula: "",
        documento: "",
        senha: RandomString(6)
    })

    const handleChangeText = (event) => {
        setData({
            ...data,
            [event.target.name] : event.target.value
        })
    }

    const handleSubmitForm = (event) => {
        event.preventDefault()

        const colaborador = data
        colaborador.matricula = Number(colaborador.matricula)

        const date = data.nascimento.split("-")
        console.log(date)
        colaborador.nascimento = `${date[2]}/${date[1]}/${date[0]}`

        if(id){
            axios
                .put(`colaborador/${id}`, colaborador)
                .then(data => {
                    swal("Dados salvos com sucesso.")
                })
                .catch(err => {
                    swal("Falha ao salvar, verifique os dados e tente novamente.")
                })
        }else{
            axios
                .post("colaborador", colaborador)
                .then(data => {
                    swal("Dados salvos com sucesso.")
                })
                .catch(err => {
                    swal("Falha ao salvar, verifique os dados e tente novamente.")
                })
        }
    }

    return (
        <>
            <Title>Adicionar novo colaborador</Title>

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
                            <label>Matrícula</label>
                            <input 
                                type="text" 
                                className="form-control"
                                name="matricula"
                                value={data.matricula}
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
                            <label>Senha</label>
                            <input 
                                type="text" 
                                className="form-control"
                                name="senha"
                                value={data.senha}
                                onChange={handleChangeText}
                                disabled
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