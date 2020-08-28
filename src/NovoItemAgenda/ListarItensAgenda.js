import React, { useState, useEffect } from 'react'
import axios from '../Service/Axios'
import Title from '../Components/Title'
import { Link } from 'react-router-dom'

export default function ListarItensAgenda(){
    const [itemAgendaLista, setItemAgendaList] = useState([])

    useEffect(() => {
        axios
            .get("itemAgenda")
            .then(({data}) => setItemAgendaList(data.data))
            .catch(err => console.log(err))
    }, [])

    return(
        <>
            <Title>Gerenciar cadastro de itens de agenda</Title>

            <div className="row justify-content-md-center">
                <div className="col-10 text-right">
                    <Link to="itemAgenda/novo" className="btn btn-primary mb-4">Novo</Link>
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
                                itemAgendaLista.map(itemAgenda => (
                                    <tr key={itemAgenda.id}>
                                        <td>{itemAgenda.id}</td>
                                        <td>{itemAgenda.nome}</td>
                                        <td>{itemAgenda.dataHora}</td>
                                        <td>{itemAgenda.tipo}</td>
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