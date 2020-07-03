import React, { useState, useEffect } from 'react'

import axios from '../Service/Axios'

import logo from '../assets/SFERA_AZUL.png'
import styles from './styles.module.css'
import { useHistory } from 'react-router-dom'

export default function Login(){
    const [dados, setDados] = useState({
        matricula: '',
        senha: ''
    })

    const [error, setError] = useState(false)
    const history = useHistory()

    useEffect(() => {
        const jwt = localStorage.getItem("jwt")
        if(jwt) history.push("/")
    }, [])

    const handleChangeText = (event) => {
        setDados({
            ...dados,
            [event.target.name] : event.target.value
        })
    }

    const handleSubmitForm = async (event) => {
        event.preventDefault()

        try{
            const { data } = await axios.post("login", dados)
        
            localStorage.setItem("jwt", JSON.stringify(data))
            history.push("/")
        }catch(err){
            console.log(err)
            setError("Dados incorretos.")
        }
    }

    return (
        <>
            <form className={styles.form} onSubmit={handleSubmitForm}>
                <div className="row">
                    <div className="col text-center">
                        <img src={logo} className={styles.logo} alt="SFERA" />
                    </div>
                </div>
                <div className="row">
                    <div className="col text-center">
                        <h2 className={styles.title}>Sistema de Frequência Escolar e Registro Acadêmico</h2>
                    </div>
                </div>

                <div className="row">
                    <div className="col">
                        {
                            error ? (
                                <div className="alert alert-danger" role="alert">
                                    {error}
                                </div>
                            ) : null
                        }
                        <div className="form-group">
                            <label>Usuário</label>
                            <input type="text" className="form-control" 
                                name="matricula"
                                value={dados.matricula}
                                onChange={handleChangeText}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Senha</label>
                            <input type="password" className="form-control" 
                                name="senha"
                                value={dados.senha} 
                                onChange={handleChangeText}
                                required
                            />
                        </div>

                        <div className="form-group text-center">
                            <button type="submit" className="btn btn-info">Acessar</button>
                        </div>
                    </div>
                </div>
            </form>
        </>
    )
}