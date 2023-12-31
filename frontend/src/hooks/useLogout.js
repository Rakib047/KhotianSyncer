import {useAuthContext} from "./useAuthContext"
import { useKhotianContext } from "./useKhotianContext"
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

export const useLogout = () =>{
    const {dispatch} = useAuthContext()
    const {dispatch:khotianDispatch} = useKhotianContext()

    const logout = () =>{
        localStorage.removeItem("user")

        dispatch({type:"LOGOUT"})
        Swal.fire({
            icon: 'info',
            title: 'Logged out!',
            text: "",
            confirmButtonColor: '#1aac83',
            background: '#f1f1f1',
        });
        khotianDispatch({type:"SET_KHOTIANS",payload:null})
    }
    
    return {logout}
}