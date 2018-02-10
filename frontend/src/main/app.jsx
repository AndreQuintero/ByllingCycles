
import React from 'react'


import Header from '../common/template/header'
import SideBar from'../common/template/sideBar'
import Footer from '../common/template/footer'
import Routes from './routes'
import Mensagens from '../common/msg/mensagem'

export default props =>(

    <div className='wrapper'>
    <Header />
    <SideBar />
    <div className='content-wrapper'>
       {props.children}
        
    </div>    
    <Footer />    
    <Mensagens />
    </div>
    
)