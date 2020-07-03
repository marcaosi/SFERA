import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'


import Sidebar from './Components/Sidebar'
import Content from './Components/Content'
import Header from './Components/Header'

import styles from './styles.module.css'

import NovoSetor from './NovoSetor'
import NovaSala from './NovaSala'
import NovoColaborador from './NovoColaborador'
import Login from './Login'
import PrivateRoute from './Components/PrivateRoute'
import NovoAluno from './NovoAluno'
import ListarSalas from './NovaSala/ListarSalas'
import ListarSetores from './NovoSetor/ListarSetores'
import ListarColaboradores from './NovoColaborador/ListarColaboradores'
import ListarAlunos from './NovoAluno/ListarAlunos'

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" exact>
          <Login />
        </Route>
        <PrivateRoute path="/">
          <Sidebar />
          <div className={styles.container + " container-fluid"}>
              <div className="row">
                <Content>
                  <Header /> 
                    <PrivateRoute path="/setor/novo" exact>
                      <NovoSetor />
                    </PrivateRoute>
                    <PrivateRoute path="/setor/:id/editar" exact>
                      <NovoSetor />
                    </PrivateRoute>
                    <PrivateRoute path="/setor" exact>
                      <ListarSetores />
                    </PrivateRoute>
                    <PrivateRoute path="/sala/novo" exact>
                      <NovaSala />
                    </PrivateRoute>
                    <PrivateRoute path="/sala/:id/editar" exact>
                      <NovaSala />
                    </PrivateRoute>
                    <PrivateRoute path="/sala" exact>
                      <ListarSalas />
                    </PrivateRoute>
                    <PrivateRoute path="/colaborador/novo" exact>
                      <NovoColaborador />
                    </PrivateRoute>
                    <PrivateRoute path="/colaborador/:id/editar" exact>
                      <NovoColaborador />
                    </PrivateRoute>
                    <PrivateRoute path="/colaborador" exact>
                      <ListarColaboradores />
                    </PrivateRoute>
                    <PrivateRoute path="/aluno/novo" exact>
                      <NovoAluno />
                    </PrivateRoute>
                    <PrivateRoute path="/aluno/:id/editar" exact>
                      <NovoAluno />
                    </PrivateRoute>
                    <PrivateRoute path="/aluno" exact>
                      <ListarAlunos />
                    </PrivateRoute>
                </Content>
              </div>
          </div>
        </PrivateRoute>
      </Switch>
    </BrowserRouter>
  )
}

export default App
