import React, {useState} from 'react'
import { Link } from 'react-router-dom'

function Signup() {
    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()

    const handleSubmit = (e) => {
        e.preventDefault()
        
    }

    return (
        <div className="d-flex flex-column justify-content-center align-items-center vh-100">
            <div className="bg-white p-3 rounded w-25 border rounded-4">
                <h2 className="text-center">Register</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3 mt-3">
                        <label htmlFor="name" className="form-label">Name:</label>
                        <input type="text" 
                            className="form-control" 
                            id="name" 
                            placeholder="Name"
                            name="name"
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

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
                        <button type="submit" className="btn btn-success btn-block">Register</button>
                    </div>
                </form>

                <p className="text-center mt-3">Already have an account? <Link to="/login">Login</Link></p>
            </div>
        </div>
    )
}

export default Signup