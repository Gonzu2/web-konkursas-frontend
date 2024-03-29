import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function ChatHistory({ tokenSent }) {
    const navigate = useNavigate()
    const [token, setToken] = useState()

    useEffect(() => {
        if (!tokenSent) {
            const checkToken = localStorage.getItem("accessToken");
            if (!checkToken) {
                localStorage.removeItem("accessToken")
                navigate("/login")
            } else {
                setToken(checkToken)
            }
        } else {
            setToken(tokenSent)
        }
    })

    return (
        <>
            ChatHistory
        </>
    )
}

export default ChatHistory