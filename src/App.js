import React from 'react'

import Sidebar from './Components/Sidebar'
import Content from './Components/Content'

import styles from './styles.module.css'

function App() {
  return (
    <>
      <Sidebar />
      <div className={styles.container + " container-fluid"}>
          <div className="row">
            <Content>
              Conteúdo
            </Content>
          </div>
      </div>
    </>
  )
}

export default App
