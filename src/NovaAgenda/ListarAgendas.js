import React, { useState, useEffect } from 'react'
import axios from '../Service/Axios'
import Title from '../Components/Title'
import { Link } from 'react-router-dom'
import swal from 'sweetalert'
import { FaTrash, FaPencilAlt } from 'react-icons/fa'

export default function ListarColaboradores(){
    const [agendas, setAgendas] = useState([])

    useEffect(() => {
        axios
            .get("agenda")
            .then(({data}) => setAgendas(data.data))
            .catch(err => console.log(err))
    }, [])

    console.log(agendas)

    return(
        <>
            <Title>Gerenciar agendas cadastradas</Title>

            <div className="row justify-content-md-center">
                <div className="col-10 text-right">
                    <Link to="agenda/novo" className="btn btn-primary mb-4">Nova agenda</Link>
                </div>
            </div>

            <div className="row justify-content-md-center">
                <div className="col-10">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Nome</th>
                                <th>Matrícula</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                agendas.map(agenda => (
                                    <tr key={agenda.id}>
                                        <td>{agenda.id}</td>
                                        <td>{agenda.aluno.nome}</td>
                                        <td>{agenda.sala.descricao + "/" + agenda.sala.ano}</td>
                                        <td>
                                            <button className="btn btn-danger btn-sm" onClick={
                                                () => {
                                                    axios
                                                    .delete(`agenda/${agenda.id}`)
                                                    .then(() => {
                                                        const newAgenda = agendas.filter(ag => ag.id !== agenda.id)
                                                        setAgendas(newAgenda)
                                                    })
                                                    .catch(() => swal("Falha ao excluir"))
                                            }}><FaTrash /></button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}