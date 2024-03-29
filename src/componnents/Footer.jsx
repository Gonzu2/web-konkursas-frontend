import react from "react"
import "./styles/footer.css"
import { useNavigate } from "react-router-dom"

function Footer() {
    const navigate = useNavigate()
    return <>
        <ul className="footer">
            <li>Darba kūrė - <span>Paulius Česna</span></li>
            <li>Atlikimo laikas - <span>2024-03-29</span></li>
            <button className="logout-button" onClick={() => {
                localStorage.removeItem("accessToken")
                navigate("/login")
            }}>Logout</button>
        </ul>
    </>
}

export default Footer