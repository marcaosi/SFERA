import React, { useState, useEffect } from 'react'
import axios from '../Service/Axios'
import Title from '../Components/Title'
import { Link } from 'react-router-dom'
import swal from 'sweetalert'
import { FaTrash, FaPencilAlt } from 'react-icons/fa'

export default function ListarOcorrencias(){
    const [ocorrencias, setOcorrencias] = useState([])

    useEffect(() => {
        axios
            .get("ocorrencia")
            .then(({data}) => setOcorrencias(data.data))
            .catch(err => console.log(err))
    }, [])

    return(
        <>
            <Title>Gerenciar ocorrências cadastradas</Title>

            <div className="row justify-content-md-center">
                <div className="col-10 text-right">
                    <Link to="ocorrencia/novo" className="btn btn-primary mb-4">Nova Ocorrência</Link>
                </div>
            </div>

            <div className="row justify-content-md-center">
                <div className="col-10">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Aluno</th>
                                <th>Data</th>
                                <th>Descrição</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                ocorrencias.map(ocorrencia => (
                                    <tr key={ocorrencia.id}>
                                        <td>{ocorrencia.id}</td>
                                        <td>{ocorrencia.aluno.nome}</td>
                                        <td>{ocorrencia.createdAt}</td>
                                        <td>{ocorrencia.descricao}</td>
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