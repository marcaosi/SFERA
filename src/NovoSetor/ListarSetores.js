import React, { useState, useEffect } from 'react'
import axios from '../Service/Axios'
import Title from '../Components/Title'
import { Link } from 'react-router-dom'
import swal from 'sweetalert'
import { FaTrash, FaPencilAlt } from 'react-icons/fa'

export default function ListarSetores(){
    const [setores, setSetores] = useState([])

    useEffect(() => {
        axios
            .get("setor")
            .then(({data}) => setSetores(data.data))
            .catch(err => console.log(err))
    }, [])

    return(
        <>
            <Title>Gerenciar setores cadastradas</Title>

            <div className="row justify-content-md-center">
                <div className="col-10 text-right">
                    <Link to="setor/novo" className="btn btn-primary mb-4">Nova setor</Link>
                </div>
            </div>

            <div className="row justify-content-md-center">
                <div className="col-10">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Nome</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                setores.map(setor => (
                                    <tr key={setor.id}>
                                        <td>{setor.id}</td>
                                        <td>{setor.nome}</td>
                                        <td>
                                            <button className="btn btn-danger btn-sm" onClick={
                                                () => {
                                                    axios
                                                    .delete(`setor/${setor.id}`)
                                                    .then(() => {
                                                        const newSetores = setores.filter(set => set.id !== setor.id)
                                                        setSetores(newSetores)
                                                    })
                                                    .catch(() => swal("Falha ao excluir"))
                                            }}><FaTrash /></button>

                                            <Link to={`setor/${setor.id}/editar`} 
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