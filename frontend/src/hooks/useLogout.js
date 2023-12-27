import {useAuthContext} from "./useAuthContext"
import { useKhotianContext } from "./useKhotianContext"

export const useLogout = () =>{
    const {dispatch} = useAuthContext()
    const {dispatch:khotianDispatch} = useKhotianContext()

    const logout = () =>{
        localStorage.removeItem("user")

        dispatch({type:"LOGOUT"})
        khotianDispatch({type:"SET_KHOTIANS",payload:null})
    }
    
    return {logout}
}