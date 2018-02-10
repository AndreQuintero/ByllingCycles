import React,{Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import If from '../operator/if'


class tabContent extends Component{
    
    
    render(){
    
        const selected = this.props.tab.selected === this.props.id    
        const visible = this.props.tab.visible[this.props.id]
        return(
            <If test ={visible}>
            <div id={this.props.id} className={`tab-pane ${selected ? 'active' : ''}`}>
                {this.props.children}
            </div>
            </If> 
        )
    }
    
}
                
                //this.props.id corresponde ao o target do tabHeader

const mapStateToProps = state=> ({tab: state.tab})
export default connect(mapStateToProps)(tabContent)