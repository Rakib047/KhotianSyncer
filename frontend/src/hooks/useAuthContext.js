import {AuthContext} from "../context/authContext"
import { useContext } from "react"

export const useAuthContext = () =>{
    const context =useContext(AuthContext) //this context actually contains the value of auth context
    //this AuthContext has value that is {state,dispatch}
    if(!context){
        throw Error("useAuthContext must be used inside and useAuthContextProvider")
    }
    return context 
}