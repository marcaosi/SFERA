import React, { useState, useEffect } from 'react'

import Title from '../Components/Title'
import axios from '../Service/Axios'
import swal from 'sweetalert'

import styles from './styles.module.css'
import { useParams } from 'react-router-dom'

export default function NovoColaborador(){

    const { id } = useParams()

    useEffect(() => {
        if(id){
            axios.get(`sala/${id}`)
                .then(({data}) => setData({
                    ...data,
                    ...(data.data)[0]
                }))
                .catch((err) => swal("Falha ao carregar dados. Recarregue a página."))
        }
    }, [id])

    const [data, setData] = useState({
        ano: new Date().getFullYear(),
        descricao: ""
    })

    const handleChangeText = (event) => {
        setData({
            ...data,
            [event.target.name] : event.target.value
        })
    }

    const handleSubmitForm = (event) => {
        event.preventDefault()

        const dados = data
        dados.ano = Number(dados.ano)

        if(id){
            axios
                .put(`sala`, data)
                .then(data => {
                    swal("Dados salvos com sucesso.")
                })
                .catch(err => {
                    swal("Falha ao salvar, verifique os dados e tente novamente.")
                })
        }else{
            axios
                .post("sala", data)
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
            <Title>Adicionar nova sala de aula</Title>

            <div className="row">
                <div className="col">
                    <form className={ styles.form } onSubmit={handleSubmitForm}>
                        <div className="form-group">
                            <label>Ano</label>
                            <input type="number" className="form-control" name="ano" value={data.ano} onChange={handleChangeText} />
                        </div>

                        <div className="form-group">
                            <label>Descrição</label>
                            <textarea className="form-control" name="descricao" onChange={handleChangeText} placeholder="Berçário I" value={data.descricao}></textarea>
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