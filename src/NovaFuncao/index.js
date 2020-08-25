import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import Title from '../Components/Title'
import axios from '../Service/Axios'
import swal from 'sweetalert'

import styles from './styles.module.css'

export default function NovaFuncao(){

    const { id } = useParams()

    useEffect(() => {
        if(id){
            axios.get(`funcao/${id}`)
                .then(({data}) => setData({
                    ...data,
                    ...(data.data)[0]
                }))
                .catch((err) => swal("Falha ao carregar dados. Recarregue a página."))
        }

        axios.get("setor")
            .then(({data}) => setSetorList(data.data))

        axios.get("horarioTrabalho")
            .then(({data}) => setHorarioTrabalhoList(data.data))
    }, [id])

    const [data, setData] = useState({
        nome: "",
        descricao: "",
        setor_id: 0,
        horarioTrabalho_id: 0,
        status: true
    })

    const [setorList, setSetorList] = useState([])
    const [horarioTrabalhoList, setHorarioTrabalhoList] = useState([])

    const handleChangeText = (event) => {
        setData({
            ...data,
            [event.target.name] : event.target.value
        })
    }

    const handleSubmitForm = (event) => {
        event.preventDefault()

        const dados = {
            ...data,
            setor_id: parseInt(data.setor_id),
            horarioTrabalho_id: parseInt(data.horarioTrabalho_id)
        }

        console.log(dados)

        if(id){
            axios
                .put(`funcao`, dados)
                .then(data => {
                    swal("Dados salvos com sucesso.")
                })
                .catch(err => {
                    swal("Falha ao salvar, verifique os dados e tente novamente.")
                })
        }else{
            axios
                .post("funcao", dados)
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
            <Title>Adicionar nova função</Title>

            <div className="row">
                <div className="col">
                    <form className={ styles.form } onSubmit={handleSubmitForm}>
                        <div className="form-group">
                            <label>Nome</label>
                            <input type="text" className="form-control" value={data.nome} name="nome" onChange={handleChangeText} />
                        </div>

                        <div className="form-group">
                            <label>Descrição</label>
                            <input type="text" className="form-control" value={data.descricao} name="descricao" onChange={handleChangeText} placeholder="Descreva as atividades da função" />
                        </div>

                        <div className="form-group">
                            <label>Setor</label>
                            <select name="setor_id" className="form-control" onChange={handleChangeText} value={data.setor_id}>
                                <option value={0} disabled>Selecione uma opção...</option>
                                {
                                    setorList.map(setor => (
                                        <option key={setor.id} value={setor.id}>{setor.nome}</option>
                                    ))
                                }
                            </select>
                        </div>

                        <div className="form-group">
                            <label>Horário de Trabalho</label>
                            <select name="horarioTrabalho_id" className="form-control" onChange={handleChangeText} value={data.horarioTrabalho_id}>
                                <option value={0} disabled>Selecione uma opção...</option>
                                {
                                    horarioTrabalhoList.map(horarioTrabalho => (
                                        <option key={horarioTrabalho.id} value={horarioTrabalho.id}>{horarioTrabalho.entrada1} - {horarioTrabalho.saida1} | {horarioTrabalho.entrada2} - {horarioTrabalho.saida2}</option>
                                    ))
                                }
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