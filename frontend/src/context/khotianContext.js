import { createContext,useReducer} from "react"

export const KhotianContext=createContext()

export const KhotianReducer = (state,action) =>{
    switch(action.type){
        case 'SET_KHOTIANS':
            return {
                khotianList:action.payload
            }
        // case 'CREATE_KHOTIAN': //not a necessity now
        //     return {
        //         khotianList:action.payload
        //     }
        case 'DELETE_KHOTIAN':
            return{
                khotianList:state.khotianList.filter((singleKhotian)=>singleKhotian._id!==action.payload._id)
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