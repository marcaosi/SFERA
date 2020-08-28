import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import Title from '../Components/Title'
import axios from '../Service/Axios'
import swal from 'sweetalert'

import jwtDecode from 'jwt-decode'

import styles from './styles.module.css'

export default function NovaFrequencia(){

    const { id } = useParams()
    const token = jwtDecode(localStorage.getItem("jwt"))

    useEffect(() => {
        if(id){
            axios.get(`frequencia/${id}`)
                .then(({data}) => setData({
                    ...data,
                    ...(data.data)[0]
                }))
                .catch((err) => swal("Falha ao carregar dados. Recarregue a página."))

        }
        axios.get("aluno")
            .then(({data}) => setAlunos(data.data))
    }, [id])

    
    const [data, setData] = useState({
        observacao: "",
        aluno_id: 0,
        colaborador_id: parseInt(token.id),
        presencia: -1
    })
    
    const [alunos, setAlunos] = useState([])

    const handleSubmitForm = (event) => {
        event.preventDefault()

        if(id){
            axios
                .put(`frequencia`, data)
                .then(data => {
                    swal("Dados salvos com sucesso.")
                })
                .catch(err => {
                    swal("Falha ao salvar, verifique os dados e tente novamente.")
                })
        }else{
            axios
                .post("frequencia", data)
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
            <Title>Registrar Frequencia</Title>

            <div className="row">
                <div className="col">
                    <form className={ styles.form } onSubmit={handleSubmitForm}>
                        <div className="form-group">
                            <label>Aluno</label>
                            <select className="form-control" value={data.aluno_id} name="aluno_id" onChange={(evt) => setData({
                                ...data,
                                aluno_id: parseInt(evt.target.value)
                            })}>
                                <option value={0}>Selecione uma opção...</option>
                                {
                                    alunos.map(aluno => (
                                        <option key={aluno.id} value={aluno.id}>{aluno.nome}</option>
                                    ))
                                }
                            </select>
                        </div>

                        <div className="form-group">
                            <label>Presença</label>
                            <select className="form-control" value={data.tipo} name="tipo" onChange={(evt) => setData({
                                ...data,
                                tipo: Boolean(evt.target.value)
                            })}>
                                <option value={-1}>Selecione uma opção...</option>
                                <option value={false}>Falta</option>
                                <option value={true}>Presença</option>
                            </select>
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