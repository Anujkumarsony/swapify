import { Link, useNavigate } from "react-router-dom";
import Header from "./Header";
import { useState } from "react";
import axios from "axios";


function Login() {
    const navigate = useNavigate();

    const [username, setusername] = useState('');
    const [password, setpassword] = useState('');

    const handleApi = () => {
        if (!username || !password) {
            alert("Username or password should not be empty");
            return; // Exit the function to prevent further execution
        }
        const url = 'http://localhost:4000/login';
        const data = { username, password };
        axios.post(url, data)
            .then((res) => {
                // console.log(res.data);
                if (res.data.message) {
                    if (res.data.token) {
                        localStorage.setItem('token', res.data.token);
                        navigate('/');
                    }
                    alert(res.data.message);
                }
            })
            .catch((err) => {
                alert('SERVER ERR');
            });
    };

    return (
        <div className="login-container">
            <Header />
            <div className="login-box">
                <h2>Welcome to Login Page</h2>
                <label htmlFor="username">USERNAME</label>
                <input 
                    type="text" 
                    id="username" 
                    value={username} 
                    onChange={(e) => setusername(e.target.value)} 
                    className="login-input"
                />
                <label htmlFor="password">PASSWORD</label>
                <input 
                    type="password" 
                    id="password" 
                    value={password} 
                    onChange={(e) => setpassword(e.target.value)} 
                    className="login-input"
                />
                <button onClick={handleApi} className="login-button">Login</button>
                <Link to="/signup" className="signup-link">Sign Up</Link>
            </div>
        </div>
    );
}

export default Login;
