import React from 'react'

import styles from './style.module.css'
import { FaTable, FaPeopleCarry, FaUser, FaList } from 'react-icons/fa'

import sfera from '../../assets/SFERA.png'
import { Link } from 'react-router-dom'

export default function Sidebar(){
    return (
        <section className={styles.container}>
            <img src={sfera} className={styles.logo} alt="sfera" />
            <hr className={styles.divider} />
            <Link to="/sala" className={styles.sidebarLink}>
                <FaTable className={styles.sidebarIcon} />
                Cadastro de Salas
            </Link>
            <Link to="/aluno" className={styles.sidebarLink}>
                <FaPeopleCarry className={styles.sidebarIcon} />
                Cadastro de Alunos
            </Link>
            <Link to="/colaborador" className={styles.sidebarLink}>
                <FaUser className={styles.sidebarIcon} />
                Cadastro de Colaboradores
            </Link>
            <Link to="/setor" className={styles.sidebarLink}>
                <FaList className={styles.sidebarIcon} />
                Cadastro de Setores
            </Link>

            <Link to="/horarioTrabalho" className={styles.sidebarLink}>
                <FaList className={styles.sidebarIcon} />
                Cadastro de Horário de trabalho
            </Link>

            <Link to="/funcao" className={styles.sidebarLink}>
                <FaList className={styles.sidebarIcon} />
                Cadastro de Funções
            </Link>

            <Link to="/ocorrencia" className={styles.sidebarLink}>
                <FaList className={styles.sidebarIcon} />
                Cadastro de Ocorrências
            </Link>

            <Link to="/itemAgenda" className={styles.sidebarLink}>
                <FaList className={styles.sidebarIcon} />
                Cadastro de Item de Agenda
            </Link>
        </section>
    )
}