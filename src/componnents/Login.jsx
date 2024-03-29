import { useState } from "react"
import axios from 'axios';
import "./styles/login.css"
import { useNavigate } from "react-router-dom";


function Login() {
    const navigate = useNavigate()
    const [token, setToken] = useState(null)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    async function handleLogin(event) {
        event.preventDefault();

        await axios.post("http://172.16.50.58:5000/login", { email: email, password: password }, { headers: { 'Authorization': 'Bearer 24b1dcc5cfe9405a87ff99be60510680', "Access-Control-Allow-Origin": "*" } })
            .then((response) => {
                if (response.status === 200) {
                    setToken(response.data)
                    localStorage.setItem('accessToken', response.data)
                    navigate("/main");
                }
            })
            .then((error) => console.log(error))

    }

    return (
        <div className="login">
            <form onSubmit={() => handleLogin}>
                Email:
                <label htmlFor="email">
                    <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </label>
                Password:
                <label htmlFor="password">
                    <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </label>
            </form>

            <button onClick={(e) => handleLogin(e)}>Login</button>
        </div>
    )
}

export default Login