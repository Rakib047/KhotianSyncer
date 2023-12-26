import { useState } from "react";
import axios from "axios";

const Signup = () =>{
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")

    const handleSubmit =async (e)=>{
        e.preventDefault()

        console.log(email,password)
    }

    return (
        <form className="auth-form" onSubmit={handleSubmit}>
            <h3>Sign up</h3>

            <label>Email:</label>
            <input
                type="email"
                onChange={(e)=>setEmail(e.target.value)}
                value={email}
                placeholder="Enter your Email"
            />
            <label>Password:</label>
            <input
                type="password"
                onChange={(e)=>setPassword(e.target.value)}
                value={password}
                placeholder="Enter your Password"
            />

            <button>Sign up</button>
        </form>
    )
}

export default Signup