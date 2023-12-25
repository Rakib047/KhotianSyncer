import { createContext,useReducer} from "react"

export const KhotianContext=createContext()

export const KhotianReducer = (state,action) =>{
    switch(action.type){
        case 'SET_KHOTIANS':
            return {
                khotianList:action.payload
            }
        case 'CREATE_KHOTIAN':
            return {
                khotianList:[action.payload,...state.khotianList]
            }
        default:
            return state
    }
}

export const KhotianContextProvider = ({children}) =>{
    const[state,dispatch]=useReducer(KhotianReducer,{
        khotianList:null
    })
    return(
        <KhotianContext.Provider value={{...state,dispatch}}>
            {children}
        </KhotianContext.Provider>
    )
}