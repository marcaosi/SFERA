import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import Title from '../Components/Title'
import axios from '../Service/Axios'
import swal from 'sweetalert'

import jwtDecode from 'jwt-decode'

import styles from './styles.module.css'

export default function NovoItemAgenda(){

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
        axios.get("agenda")
            .then(({data}) => setAgendas(data.data))
    }, [id])

    
    const [data, setData] = useState({
        observacao: "",
        agenda_id: 0,
        colaborador_id: token.id,
        tipo: "0"
    })
    
    const [agendas, setAgendas] = useState([])
    const tipos = [
        "Não comeu bem",
        "Não foi ao banheiro",
        "Vomitou",
        "Passou mal",
        "Brigou",
        "Brincou corretamente"
    ]

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
                .put(`itemAgenda`, data)
                .then(data => {
                    swal("Dados salvos com sucesso.")
                })
                .catch(err => {
                    swal("Falha ao salvar, verifique os dados e tente novamente.")
                })
        }else{
            axios
                .post("itemAgenda", data)
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
            <Title>Adicionar novo item para agenda</Title>

            <div className="row">
                <div className="col">
                    <form className={ styles.form } onSubmit={handleSubmitForm}>
                        <div className="form-group">
                            <label>Agenda</label>
                            <select className="form-control" value={data.agenda_id} name="agenda_id" onChange={(evt) => setData({
                                ...data,
                                agenda_id: parseInt(evt.target.value)
                            })}>
                                <option value={0}>Selecione uma opção...</option>
                                {
                                    agendas.map(agenda => (
                                        <option key={agenda.id} value={agenda.id}>{agenda.aluno.nome}</option>
                                    ))
                                }
                            </select>
                        </div>

                        <div className="form-group">
                            <label>Tipo</label>
                            <select className="form-control" value={data.tipo} name="tipo" onChange={(evt) => setData({
                                ...data,
                                tipo: evt.target.value
                            })}>
                                <option value={0}>Selecione uma opção...</option>
                                {
                                    tipos.map(tipo => (
                                        <option key={tipo} value={tipo}>{tipo}</option>
                                    ))
                                }
                            </select>
                        </div>

                        <div className="form-group">
                            <label>Observação</label>
                            <input type="text" className="form-control" value={data.observacao} name="observacao" onChange={handleChangeText} />
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