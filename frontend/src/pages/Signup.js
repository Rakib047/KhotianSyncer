import { useState } from "react";
import { useSignup } from "../hooks/useSignup";

const Signup = () =>{
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [username,setUsername]= useState("")
    const [studentId,setStudentId]= useState("")
    const {signup,isLoading,error}=useSignup()

    const handleSubmit =async (e)=>{
        e.preventDefault()
        await signup(email,password,username,studentId)
    }

    return (
        <form className="auth-form" onSubmit={handleSubmit}>
            <h3>Sign up</h3>

            
            <input
                type="text"
                onChange={(e)=>setUsername(e.target.value)}
                value={username}
                placeholder="Enter your Username"
            />

            
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

            <input
                type="text"
                onChange={(e)=>setStudentId(e.target.value)}
                value={studentId}
                placeholder="Enter your Student Id"
            />

            <button disabled={isLoading}>Sign up</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default Signup