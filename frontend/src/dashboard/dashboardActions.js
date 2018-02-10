import axios from 'axios'

const BaseURL = 'http://localhost:3005/api'

export function getSummary(){
    
    const request = axios.get(`${BaseURL}/billingCycles/summary`)
    
    return{
        type: 'BILLING_SUMMARY_FETCHED',
        payload: request
    }
}