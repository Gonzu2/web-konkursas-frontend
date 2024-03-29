import './App.css';
import Main from "./componnents/Main"
import Login from "./componnents/Login"
import { useNavigate, redirect } from "react-router-dom";
import { createContext, useEffect, useState } from 'react';

export const UserContext = createContext()

function App() {
  const navigate = useNavigate()
  const [token, setToken] = useState();

  useEffect(() => {
    const token = localStorage.getItem("accessToken")
    if (token) {
      setToken(token)
    }
  }, [])

  return (
    <>
      {token ? <Main token={token} /> : <Login />}
    </>
  );
}

export default App;
