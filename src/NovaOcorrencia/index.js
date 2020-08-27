import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import Title from '../Components/Title'
import axios from '../Service/Axios'
import swal from 'sweetalert'

import jwtDecode from 'jwt-decode'

import styles from './styles.module.css'

export default function NovaOcorrencia(){

    const { id } = useParams()
    const token = jwtDecode(localStorage.getItem("jwt"))
    console.log(token)

    useEffect(() => {
        if(id){
            axios.get(`ocorrencia/${id}`)
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
        descricao: "",
        aluno_id: 0,
        colaborador_id: token.id
    })
    
    const [alunos, setAlunos] = useState([])

    const handleChangeText = (event) => {
        setData({
            ...data,
            [event.target.name] : event.target.value
        })
    }

    const handleSubmitForm = (event) => {
        event.preventDefault()

        if(id){
            axios
                .put(`ocorrencia`, data)
                .then(data => {
                    swal("Dados salvos com sucesso.")
                })
                .catch(err => {
                    swal("Falha ao salvar, verifique os dados e tente novamente.")
                })
        }else{
            axios
                .post("ocorrencia", data)
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
            <Title>Adicionar nova ocorrência para aluno</Title>

            <div className="row">
                <div className="col">
                    <form className={ styles.form } onSubmit={handleSubmitForm}>
                        <div className="form-group">
                            <label>Aluno</label>
                            <select className="form-control" name="aluno_id" onChange={(evt) => setData({
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
                            <label>Conteúdo</label>
                            <input type="text" className="form-control" value={data.descricao} name="descricao" onChange={handleChangeText} />
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