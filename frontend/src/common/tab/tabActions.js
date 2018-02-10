export function selectTab(tabId){
    
    console.log(tabId)
    
    return{
        type: 'TAB_SELECTED',
        payload: tabId
    }
}

export function showTabs(...tabIds){ //conjunto de ids, operador spread uma sequencia  de vários parâmetros
    
    const tabsToShow = {} //um objeto com vários atributos e cada atributo é uma tab a ser exibida
    tabIds.forEach(e=> tabsToShow[e] = true)  // 'e' seria o tabIds  ex: tabIds {'tabList', 'tabUpdate'} tabsToShow:{tabList: true, tabUpdate:true}
    
    return{
        type:'TAB_SHOWED',
        payload: tabsToShow
    }
}