import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import Title from '../Components/Title'
import axios from '../Service/Axios'
import swal from 'sweetalert'

import styles from './styles.module.css'
import { ModalHeader, Modal, ModalBody, ModalFooter } from 'reactstrap'

export default function NovaAgenda(){

    const { id } = useParams()
    const [students, setStudents] = useState([])
    const [classes, setClasses] = useState([])

    useEffect(() => {
        if(id){
            axios.get(`agenda`)
                .then(({data}) => setData({
                    ...data,
                    ...(data.data)[0]
                }))
                .catch((err) => swal("Falha ao carregar dados. Recarregue a página."))
        }

        axios.get("aluno")
            .then(({data}) => setStudents(data.data))

        axios.get("sala")
            .then(({data}) => setClasses(data.data))
    }, [id])

    const [data, setData] = useState({
        sala_id: 0,
        aluno_id: 0
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
                .put(`agenda/${id}`, data)
                .then(data => {
                    swal("Dados salvos com sucesso.")
                })
                .catch(err => {
                    swal("Falha ao salvar, verifique os dados e tente novamente.")
                })
        }else{
            axios
                .post("agenda", data)
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
                    {
                        students.map(student => (
                            <div key={student.id} className={ styles.itemList }>
                                <button className="btn btn-primary" onClick={() => {
                                    setData({
                                        ...data,
                                        aluno_id: student.id
                                    })
                                    handleConsultStudent()
                                }}>Selecionar</button> {student.nome}
                            </div>
                        ))
                    }
                </ModalBody>
                <ModalFooter>
                    <button className="btn btn-danger" onClick={handleConsultStudent}>Fechar</button>
                </ModalFooter>
            </Modal>

            <Modal isOpen={modalClassOpen}>
                <ModalHeader toggle={handleConsultClass}>Consultar Salas</ModalHeader>
                <ModalBody>
                    {
                        classes.map(cls => (
                            <div key={cls.id} className={ styles.itemList }>
                                <button className="btn btn-primary" onClick={() => {
                                    setData({
                                        ...data,
                                        sala_id: cls.id
                                    })
                                    handleConsultClass()
                                }}>Selecionar</button> {cls.descricao + " - " + cls.ano}
                            </div>
                        ))
                    }
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
                                name="aluno_id"
                                value={data.aluno_id}
                                onChange={handleChangeText}
                            />&nbsp;
                            <button type="button" className="btn btn-warning btn-sm" onClick={handleConsultStudent}>Consultar</button>
                        </div>

                        <div className="form-group form-inline">
                            <label>Sala: &nbsp;</label>
                            <input 
                                type="text" 
                                className="form-control"
                                name="sala_id"
                                value={data.sala_id}
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