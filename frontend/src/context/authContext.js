import {createContext,useReducer,useEffect} from 'react'

export const AuthContext=createContext()

export const AuthReducer = (prevState,action) =>{
    switch(action.type){
        case "LOGIN":
            return {user:action.payload}
        case "LOGOUT":
            return {user:null}
        default:
            return prevState
    }
}

export const AuthContextProvider = ({children}) =>{
    const [state,dispatch] = useReducer(AuthReducer,{
        user:null
    })

    //this function will be fired once whenever the AuthContextProvider component renders(reload)
    //what this does is that whenever we reload the page,the react wont go back to login signup page if user 
    //is logged in
    useEffect(()=>{
        const user=JSON.parse(localStorage.getItem('user'))

        if(user){
            dispatch({type:"LOGIN",payload:user})
        }
    },[])

    console.log("AuthContext state : ",state)

    return (
        <AuthContext.Provider value={{...state,dispatch}}>
            {children}
        </AuthContext.Provider>
    )
}