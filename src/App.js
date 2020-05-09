import React from 'react'

import Sidebar from './Components/Sidebar'
import Content from './Components/Content'
import Header from './Components/Header'

import styles from './styles.module.css'
import NovoSetor from './NovoSetor'

function App() {
  return (
    <>
      <Sidebar />
      <div className={styles.container + " container-fluid"}>
          <div className="row">
            <Content>
              <Header />
              <NovoSetor />
            </Content>
          </div>
      </div>
    </>
  )
}

export default App
