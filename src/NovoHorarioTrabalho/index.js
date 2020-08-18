import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import Title from '../Components/Title'
import axios from '../Service/Axios'
import swal from 'sweetalert'

import styles from './styles.module.css'

export default function NovoHorarioTrabalho(){

    const { id } = useParams()

    useEffect(() => {
        if(id){
            axios.get(`horarioTrabalho`)
                .then(({data}) => setData({
                    ...data,
                    ...(data.data)[0]
                }))
                .catch((err) => swal("Falha ao carregar dados. Recarregue a página."))
        }
    }, [id])

    const [data, setData] = useState({
        entrada1: "",
        saida1: "",
        entrada2: "",
        saida2: ""
    })

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
                .put(`horarioTrabalho`, data)
                .then(data => {
                    swal("Dados salvos com sucesso.")
                })
                .catch(err => {
                    swal("Falha ao salvar, verifique os dados e tente novamente.")
                })
        }else{
            axios
                .post("horarioTrabalho", data)
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
            <Title>Adicionar novo Horário de trabalho</Title>

            <div className="row">
                <div className="col">
                    <form className={ styles.form } onSubmit={handleSubmitForm}>
                        <p className="text-muted">Informe os horários no formato HH:mm</p>
                        <div className="row">
                            <div className="form-group col-6 form-inline">
                                <label className="col-4">Entrada 1:</label>
                                <input 
                                    type="text" 
                                    className="form-control col-8"
                                    name="entrada1"
                                    value={data.entrada1}
                                    onChange={handleChangeText}
                                />
                            </div>

                            <div className="form-group col-6 form-inline">
                                <label className="col-4">Saída 1:</label>
                                <input 
                                    type="text" 
                                    className="form-control col-8"
                                    name="saida1"
                                    value={data.saida1}
                                    onChange={handleChangeText}
                                />
                            </div>
                        </div>

                        <div className="row">
                            <div className="form-group col-6 form-inline">
                                <label className="col-4">Entrada 2:</label>
                                <input 
                                    type="text" 
                                    className="form-control col-8"
                                    name="entrada2"
                                    value={data.entrada2}
                                    onChange={handleChangeText}
                                />
                            </div>

                            <div className="form-group col-6 form-inline">
                                <label className="col-4">Saída 2:</label>
                                <input 
                                    type="text" 
                                    className="form-control col-8"
                                    name="saida2"
                                    value={data.saida2}
                                    onChange={handleChangeText}
                                />
                            </div>
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