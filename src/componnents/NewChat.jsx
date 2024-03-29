import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function NewChat({ tokenSent }) {
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
            newChat
        </>
    )
}

export default NewChat