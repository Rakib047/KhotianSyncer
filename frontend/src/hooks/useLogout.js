import {useAuthContext} from "./useAuthContext"
import { useKhotianContext } from "./useKhotianContext"
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

export const useLogout = () =>{
    const {dispatch,user} = useAuthContext()
    const {dispatch:khotianDispatch} = useKhotianContext()

    const logout = () =>{
        localStorage.removeItem("user")

        dispatch({type:"LOGOUT"})
        Swal.fire({
            icon: 'info',
            title: 'Logging out!',
            text: `Logging out from user ${user.username}`,
            confirmButtonColor: '#1aac83',
            background: '#f1f1f1',
        });
        khotianDispatch({type:"SET_KHOTIANS",payload:null})
    }
    
    return {logout}
}