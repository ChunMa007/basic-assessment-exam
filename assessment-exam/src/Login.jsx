import React, { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { login } from "./api";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const isLoggedIn = localStorage.getItem("IsLoggedIn")
        if(isLoggedIn) {
            navigate("/home")
        }
    }, [navigate])
    


    async function handleSubmit(e) {
        e.preventDefault();
        console.log(`Email: ${email} | Password: ${password}`)
        try{
            await login(email, password)
            localStorage.setItem("IsLoggedIn", true)
            navigate("/home")
        } catch(err) {
            setError(err.message)

            setTimeout(() => {
                setError(null)
            }, 2000)
        }
    }

    return (
        <div className="d-flex flex-column justify-content-center align-items-center vh-100">
            {error && (
                <div className="alert alert-danger" style={{position: "fixed", top: "20px"}}>
                    <p><strong>Login Failed! </strong> {error}</p>
                </div>
            )}

            <div className="bg-white p-3 rounded w-25 border rounded-4 shadow">
                <p className="text-center text-muted">email: admin@gmail.com | password: admin123</p>
                <h2 className="text-center">Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3 mt-3">
                        <label htmlFor="email" className="form-label">Email:</label>
                        <input type="email" 
                            className="form-control" 
                            id="email" 
                            placeholder="Email" 
                            name="email"
                            onChange={(e) => setEmail(e.target.value)}
                            />
                    </div>

                    <div className="mb-3 mt-3">
                        <label htmlFor="password" className="form-label">Password:</label>
                        <input type="password" 
                            className="form-control" 
                            id="password" 
                            placeholder="Password" 
                            name="password"
                            onChange={(e) => setPassword(e.target.value)}
                            />
                    </div>

                    <div className="d-grid">
                        <button type="submit" className="btn btn-primary btn-block">Login</button>
                    </div>
                </form>

                <p className="text-center mt-3">Don't have an account yet? <Link to="/register">Signup</Link></p>
            </div> 
        </div>
    )
}

export default Login