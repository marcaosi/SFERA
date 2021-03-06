import React, { useState, useEffect } from 'react'
import axios from '../Service/Axios'
import Title from '../Components/Title'
import { Link } from 'react-router-dom'
import { FaTrash, FaPencilAlt } from 'react-icons/fa'
import swal from 'sweetalert'

export default function ListarSalas(){
    const [salas, setSalas] = useState([])

    useEffect(() => {
        axios
            .get("sala")
            .then(({data}) => setSalas(data.data))
            .catch(err => console.log(err))
    }, [])

    return(
        <>
            <Title>Gerenciar salas cadastradas</Title>

            <div className="row justify-content-md-center">
                <div className="col-10 text-right">
                    <Link to="sala/novo" className="btn btn-primary mb-4">Nova Sala</Link>
                </div>
            </div>

            <div className="row justify-content-md-center">
                <div className="col-10">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Ano</th>
                                <th>Descrição</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                salas.map(sala => (
                                    <tr key={sala.id}>
                                        <td>{sala.id}</td>
                                        <td>{sala.ano}</td>
                                        <td>{sala.descricao}</td>
                                        <td>
                                            <button className="btn btn-danger btn-sm" onClick={
                                                () => {
                                                    axios
                                                    .delete(`sala/${sala.id}`)
                                                    .then(() => {
                                                        const newSalas = salas.filter(sal => sal.id !== sala.id)
                                                        setSalas(newSalas)
                                                    })
                                                    .catch(() => swal("Falha ao excluir"))
                                            }}><FaTrash /></button>

                                            <Link to={`sala/${sala.id}/editar`} 
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