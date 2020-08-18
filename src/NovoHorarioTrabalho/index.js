import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import Title from '../Components/Title'
import axios from '../Service/Axios'
import swal from 'sweetalert'

import styles from './styles.module.css'
import { ModalHeader, Modal, ModalBody, ModalFooter } from 'reactstrap'

export default function NovoHorarioTrabalho(){

    const { id } = useParams()

    useEffect(() => {
        if(id){
            axios.get(`horarioTrabalho`)
                .then(({data}) => setData({
                    ...data,
                    ...(data.data)[0]
                }))
                .catch((err) => swal("Falha ao carregar dados. Recarregue a página."))
        }
    }, [id])

    const [data, setData] = useState({
        entrada1: 0,
        saida1: 0
    })

    const handleChangeText = (event) => {
        setData({
            ...data,
            [event.target.name] : event.target.value
        })
    }

    const handleSubmitForm = (event) => {
        event.preventDefault()

        if(id){
            axios
                .put(`horarioTrabalho/${id}`, data)
                .then(data => {
                    swal("Dados salvos com sucesso.")
                })
                .catch(err => {
                    swal("Falha ao salvar, verifique os dados e tente novamente.")
                })
        }else{
            axios
                .post("horarioTrabalho", data)
                .then(data => {
                    swal("Dados salvos com sucesso.")
                })
                .catch(err => {
                    swal("Falha ao salvar, verifique os dados e tente novamente.")
                })
        }
    }

    const [modalStudentOpen, setModalStudentOpen] = useState(false)
    const [modalClassOpen, setModalClassOpen] = useState(false)

    const handleConsultClass = () => {
        setModalClassOpen(!modalClassOpen)
    }

    const handleConsultStudent = () => {
        setModalStudentOpen(!modalStudentOpen)
    }

    return (
        <>
            <Title>Adicionar nova agenda</Title>

            <Modal isOpen={modalStudentOpen}>
                <ModalHeader toggle={handleConsultStudent}>Consultar Alunos</ModalHeader>
                <ModalBody>
                    
                </ModalBody>
                <ModalFooter>
                    <button className="btn btn-danger" onClick={handleConsultStudent}>Fechar</button>
                </ModalFooter>
            </Modal>

            <Modal isOpen={modalClassOpen}>
                <ModalHeader toggle={handleConsultClass}>Consultar Salas</ModalHeader>
                <ModalBody>
                    
                </ModalBody>
                <ModalFooter>
                    <button className="btn btn-danger" onClick={handleConsultClass}>Fechar</button>
                </ModalFooter>
            </Modal>

            <div className="row">
                <div className="col">
                    <form className={ styles.form } onSubmit={handleSubmitForm}>
                        <div className="form-group form-inline">
                            <label>Aluno: &nbsp;</label>
                            <input 
                                type="text" 
                                className="form-control"
                                name="id_aluno"
                                value={data.id_aluno}
                                onChange={handleChangeText}
                            />&nbsp;
                            <button type="button" className="btn btn-warning btn-sm" onClick={handleConsultStudent}>Consultar</button>
                        </div>

                        <div className="form-group form-inline">
                            <label>Sala: &nbsp;</label>
                            <input 
                                type="text" 
                                className="form-control"
                                name="id_sala"
                                value={data.id_sala}
                                onChange={handleChangeText}
                            />&nbsp;
                            <button type="button" className="btn btn-warning btn-sm" onClick={handleConsultClass}>Consultar</button>
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