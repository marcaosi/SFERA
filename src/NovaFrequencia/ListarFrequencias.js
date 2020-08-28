import React, { useState, useEffect } from 'react'
import axios from '../Service/Axios'
import Title from '../Components/Title'
import { Link } from 'react-router-dom'

export default function ListarFrequencias(){
    const [frequenciaList, setFrequenciaList] = useState([])

    useEffect(() => {
        axios
            .get("frequencia")
            .then(({data}) => setFrequenciaList(data.data))
            .catch(err => console.log(err))
    }, [])

    return(
        <>
            <Title>Gerenciar cadastro de itens de agenda</Title>

            <div className="row justify-content-md-center">
                <div className="col-10 text-right">
                    <Link to="/frequencia/novo" className="btn btn-primary mb-4">Novo</Link>
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
                                frequenciaList.map(frequencia => (
                                    <tr key={frequencia.id}>
                                        <td>{frequencia.id}</td>
                                        <td>{frequencia.aluno.nome}</td>
                                        <td>{frequencia.dataHora}</td>
                                        <td>{frequencia.presenca ? "Presente" : "Ausente"}</td>
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