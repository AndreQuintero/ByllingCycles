import React,{Component} from 'react'

import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {selectTab} from './tabActions'
import If from '../operator/if'

 class tabHeader extends Component{
    
    
    render(){
        
        const selected= this.props.tab.selected === this.props.target 
        const visible = this.props.tab.visible[this.props.target]
        
        return(
            
            <If test={visible}>
                
            
            <li className={selected ? 'active' : ''}>
                <a href='javascript:;'
                    data-toggle='tab'
                    onClick={() =>this.props.selectTab(this.props.target)}
                    data-target={this.props.target}>
                    <i className={`fa fa-${this.props.icon}`}></i> {this.props.label}
                </a>
            </li>
            </If>
        )
    }
    
    
    
}

const mapStateToProps = state =>({tab: state.tab}) //vem do reducer
const mapDispatchToProps = dispatch =>bindActionCreators({selectTab}, dispatch) //chama a action e passa o resultado para os reducers 

export default connect(mapStateToProps, mapDispatchToProps)(tabHeader)

//onClick={() =>this.props.selectTab() é chamado graças ao dispatch/ target é o id do conteúdo a ser exibido/ como não estamos passando como parametro o evento, então temos que chamar a arrow function


/* const selected= this.props.tab.selected === this.props.target // se o atributo do reducer tab for igual ao target ele faz uma condição na classe do li para que ela se torne ativa, uma classe css 
        return(
            
            <li className={selected ? 'active' : ''}>*/