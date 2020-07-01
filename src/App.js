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

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" exact>
          <Login />
        </Route>
        <Route path="/">
          <Sidebar />
          <div className={styles.container + " container-fluid"}>
              <div className="row">
                <Content>
                  <Header /> 
                    <PrivateRoute path="/setor/novo" exact>
                      <NovoSetor />
                    </PrivateRoute>
                    <PrivateRoute path="/sala/novo" exact>
                      <NovaSala />
                    </PrivateRoute>
                    <PrivateRoute path="/sala" exact>
                      <ListarSalas />
                    </PrivateRoute>
                    <PrivateRoute path="/colaborador/novo" exact>
                      <NovoColaborador />
                    </PrivateRoute>
                    <PrivateRoute path="/aluno/novo" exact>
                      <NovoAluno />
                    </PrivateRoute>
                </Content>
              </div>
          </div>
        </Route>
      </Switch>
    </BrowserRouter>
  )
}

export default App
