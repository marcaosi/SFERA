import React, { useState, useEffect } from 'react'
import axios from '../Service/Axios'
import Title from '../Components/Title'
import { Link } from 'react-router-dom'
import { FaTrash, FaPencilAlt } from 'react-icons/fa'
import swal from 'sweetalert'

export default function ListarAlunos(){
    const [alunos, setAlunos] = useState([])

    useEffect(() => {
        axios
            .get("aluno")
            .then(({data}) => setAlunos(data.data))
            .catch(err => console.log(err))
    }, [])

    return(
        <>
            <Title>Gerenciar alunos cadastrados</Title>

            <div className="row justify-content-md-center">
                <div className="col-10 text-right">
                    <Link to="aluno/novo" className="btn btn-primary mb-4">Novo Aluno</Link>
                </div>
            </div>

            <div className="row justify-content-md-center">
                <div className="col-10">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Nome</th>
                                <th>Documento</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                alunos.map(aluno => (
                                    <tr key={aluno.id}>
                                        <td>{aluno.id}</td>
                                        <td>{aluno.nome}</td>
                                        <td>{aluno.documento}</td>
                                        <td>
                                            <button className="btn btn-danger btn-sm" onClick={
                                                () => {
                                                    axios
                                                    .delete(`aluno/${aluno.id}`)
                                                    .then(() => {
                                                        const newAlunos = alunos.filter(al => al.id !== aluno.id)
                                                        setAlunos(newAlunos)
                                                    })
                                                    .catch(() => swal("Falha ao excluir"))
                                            }}><FaTrash /></button>

                                            <Link to={`aluno/${aluno.id}/editar`} 
                                                className="btn btn-warning btn-sm ml-2"
                                            ><FaPencilAlt /></Link>
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