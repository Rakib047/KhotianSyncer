import {KhotianContext} from "../context/khotianContext"
import { useContext } from "react"

export const useKhotianContext = () =>{
    const context =useContext(KhotianContext) //this context actually contains the value of khotian context
    //this KhotianContext has value that is {state,dispatch}
    if(!context){
        throw Error("useKhotianContext must be used inside and khotianContextProvider")
    }
    return context 
}