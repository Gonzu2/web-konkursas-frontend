import react from "react"
import "./styles/navbar.css"

function Navbar() {

    return <>
        <ul className="navbar">
            <li><a className="header-brand" href="/">KITM DI</a></li>
            <li>
                <a href="/history">Pokalbių istorija</a>
                <a href="/main">Naujas pokalbis</a>
            </li>
        </ul>
    </>
}

export default Navbar