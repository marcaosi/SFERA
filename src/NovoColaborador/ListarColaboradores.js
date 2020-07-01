import React, { useState, useEffect } from 'react'
import axios from '../Service/Axios'
import Title from '../Components/Title'
import { Link } from 'react-router-dom'
import swal from 'sweetalert'
import { FaTrash, FaPencilAlt } from 'react-icons/fa'

export default function ListarColaboradores(){
    const [colaboradores, setColaboradores] = useState([])

    useEffect(() => {
        axios
            .get("colaborador")
            .then(({data}) => setColaboradores(data.data))
            .catch(err => console.log(err))
    }, [])

    return(
        <>
            <Title>Gerenciar colaboradores cadastrados</Title>

            <div className="row justify-content-md-center">
                <div className="col-10 text-right">
                    <Link to="colaborador/novo" className="btn btn-primary mb-4">Novo colaborador</Link>
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
                                colaboradores.map(colaborador => (
                                    <tr key={colaborador.id}>
                                        <td>{colaborador.id}</td>
                                        <td>{colaborador.nome}</td>
                                        <td>{colaborador.matricula}</td>
                                        <td>
                                            <button className="btn btn-danger btn-sm" onClick={
                                                () => {
                                                    axios
                                                    .delete(`colaborador/${colaborador.id}`)
                                                    .then(() => {
                                                        const newColab = colaboradores.filter(col => col.id !== colaborador.id)
                                                        setColaboradores(newColab)
                                                    })
                                                    .catch(() => swal("Falha ao excluir"))
                                            }}><FaTrash /></button>

                                            <Link to={`colaborador/${colaborador.id}/editar`} 
                                                className="btn btn-warning btn-sm ml-2"
                                            ><FaPencilAlt  /></Link>
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