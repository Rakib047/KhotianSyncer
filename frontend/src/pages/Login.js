import { useState } from "react";
import { useLogin } from "../hooks/useLogin";


const Login = () =>{
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const {login, isLoading, error}=useLogin()

    const handleSubmit =async (e)=>{
        e.preventDefault()

        await login(email,password)
    }

    return (
        <form className="auth-form" onSubmit={handleSubmit}>
            <h3>Log in</h3>

            
            <input
            
                type="email"
                onChange={(e)=>setEmail(e.target.value)}
                value={email}
                placeholder="Enter your Email"
            />
            
            <input
                type="password"
                onChange={(e)=>setPassword(e.target.value)}
                value={password}
                placeholder="Enter your Password"
            />

            <button disabled={isLoading}>Log in</button>
            
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default Login