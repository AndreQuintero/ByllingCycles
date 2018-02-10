import React, {Component} from 'react'

export default class Grid extends Component {
    
    
    toCssClasses(numbers) { //recebe uma string com números e transforma esses números nas classes css do bootstrap
            
        const cols = numbers ? numbers.split(' ') : []   //se esse número veio setado ele vai separar em espaço e me retorna um array dos números
        
        let classes = ''
        
        if(cols[0]) //primeiro número no array de números existe
            {
            classes += `col-xs-${cols[0]}`  //col-xs-6
    }
        if(cols[1]){
        
        classes += ` col-sm-${cols[1]}`
    }
        if(cols[2]){
            
            classes += ` col-md-${cols[2]}`
    }
        if(cols[3]){
            
            classes += ` col-lg-${cols[3]}`
        }  
        
        return classes
}
    
    render(){
        
        const gridClasses = this.toCssClasses(this.props.cols || '12')
        
        return(
            <div className={gridClasses}>
                {this.props.children}
            </div>
        )
    }
    
    
}