import React, { useState, useEffect } from 'react'
import axios from '../Service/Axios'
import Title from '../Components/Title'
import { Link } from 'react-router-dom'
import swal from 'sweetalert'
import { FaTrash, FaPencilAlt } from 'react-icons/fa'

export default function ListarHorarioTrabalho(){
    const [horarios, setHorarios] = useState([])

    useEffect(() => {
        axios
            .get("horarioTrabalho")
            .then(({data}) => setHorarios(data.data))
            .catch(err => console.log(err))
    }, [])

    return(
        <>
            <Title>Gerenciar horários de trabalho cadastrados</Title>

            <div className="row justify-content-md-center">
                <div className="col-10 text-right">
                    <Link to="horarioTrabalho/novo" className="btn btn-primary mb-4">Novo Horário de Trabalho</Link>
                </div>
            </div>

            <div className="row justify-content-md-center">
                <div className="col-10">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Entrada 1</th>
                                <th>Saída 1</th>
                                <th>Entrada 2</th>
                                <th>Saída 2</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                horarios.map(horario => (
                                    <tr key={horario.id}>
                                        <td>{horario.id}</td>
                                        <td>{horario.entrada1}</td>
                                        <td>{horario.saida1}</td>
                                        <td>{horario.entrada2}</td>
                                        <td>{horario.saida2}</td>
                                        <td>
                                            <button className="btn btn-danger btn-sm" onClick={
                                                () => {
                                                    axios
                                                    .delete(`horarioTrabalho/${horario.id}`)
                                                    .then(() => {
                                                        const newHorarios = horarios.filter(hor => hor.id !== horario.id)
                                                        setHorarios(newHorarios)
                                                    })
                                                    .catch(() => swal("Falha ao excluir"))
                                            }}><FaTrash /></button>

                                            <Link to={`horarioTrabalho/${horario.id}/editar`} 
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