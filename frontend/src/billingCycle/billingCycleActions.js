import axios from 'axios'
import {toastr} from 'react-redux-toastr'
import {reset as resetForm, initialize} from 'redux-form'

import {showTabs, selectTab} from '../common/tab/tabActions'

const BASE_URL ='http://localhost:3005/api'

const INITIAL_VALUES ={credits:[{}],debts:[{}]}

export function getList(){
    
    const request = axios.get(`${BASE_URL}/billingCycles`)
    
    return{
        
        type: 'BILLING_CYCLES_FETCHED',
        payload: request
    }
}

export function create(values){  
    return submit(values, 'post')
}

export function update(values){

    return submit(values,'put') 

}

export function remove(values){

    return submit(values,'delete')
}

function submit(values,method){

    //valores do formulário, quando clicado no submit
    
    return dispatch => {  //redux multi

        const id = values._id ? values._id : ''  //id que o mongodb gera, se for post ele retorna uma string vazia
        axios[method](`${BASE_URL}/billingCycles/${id}`, values) //promisse
        .then(resp=>{
            toastr.success('Sucesso','Operação Realizada Com Sucesso') //quando o post for acionado, faça este método
            //redux multi, array de actions 
                dispatch(init())
    })
        .catch(e=>{   //tratamento de erros
            e.response.data.errors.forEach(error => toastr.error('Erro',error)) //faz um forEach pra cada erro que vier 
                
        })
    }
} 

export function showUpdate(billingCycle){

    return [

        showTabs('tabUpdate'), //mostra a tab
        selectTab('tabUpdate'), //vai até a tab
        initialize('billingCycleForm', billingCycle)
    ]
}
export function showDelete(billingCycle){  //reusar esse método depois
    
        return [
    
            showTabs('tabDelete'), //mostra a tab
            selectTab('tabDelete'), //vai até a tab
            initialize('billingCycleForm', billingCycle)
        ]
    }

export function init(){

    return[  //redux multi faz retornar várias actions

        showTabs('tabList','tabCreate'),
        selectTab('tabList'),
        getList(),
        initialize('billingCycleForm', INITIAL_VALUES)
    ]
}