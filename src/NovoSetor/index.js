import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import Title from '../Components/Title'
import axios from '../Service/Axios'
import swal from 'sweetalert'

import styles from './styles.module.css'

export default function NovoSetor(){

    const { id } = useParams()

    useEffect(() => {
        if(id){
            axios.get(`setor/${id}`)
                .then(({data}) => setData({
                    ...data,
                    ...(data.data)[0]
                }))
                .catch((err) => swal("Falha ao carregar dados. Recarregue a página."))
        }
    }, [id])

    const [data, setData] = useState({
        nome: ""
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
                .put(`setor/${id}`, data)
                .then(data => {
                    swal("Dados salvos com sucesso.")
                })
                .catch(err => {
                    swal("Falha ao salvar, verifique os dados e tente novamente.")
                })
        }else{
            axios
                .post("setor", data)
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
            <Title>Adicionar novo setor de trabalho</Title>

            <div className="row">
                <div className="col">
                    <form className={ styles.form } onSubmit={handleSubmitForm}>
                        <div className="form-group">
                            <label>Nome</label>
                            <input type="text" className="form-control" value={data.nome} name="nome" onChange={handleChangeText} />
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