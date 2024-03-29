import { useEffect, useState } from "react"
import { redirect, useLocation, useNavigate } from "react-router-dom"

import "./styles/main.css"
import axios from "axios"

function Main({ tokenSent }) {
    const navigate = useNavigate()
    const [token, setToken] = useState()
    const [header, setHeader] = useState("Naujas pokalbis")
    const [text, setText] = useState()
    const [messages, setMessages] = useState([])

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

    async function sendMessageToApi(event) {
        event.preventDefault()
        // const updatedMessages = [
        //     ...sentMessages,
        //     {
        //         sentBy: 'Me',
        //         messageContent: text
        //     }
        // ]

        // setSentMessages(updatedMessages);

        await axios.post("http://172.16.50.58:5000/new", { prompt: text }, { headers: { 'Authorization': 'Bearer 24b1dcc5cfe9405a87ff99be60510680', "Access-Control-Allow-Origin": "*" } })

        let chats;
        let correctChat;

        await axios.get("http://172.16.50.58:5000/chats", { headers: { 'Authorization': 'Bearer 24b1dcc5cfe9405a87ff99be60510680', "Access-Control-Allow-Origin": "*" } })
            .then((response) => {
                chats = response.data
            })

        chats.forEach(element => {
            if (element.name === text) {
                correctChat = element;
                return
            }
        });

        setHeader(correctChat.name)

        await axios.get(`http://172.16.50.58:5000/chat/${correctChat.id}`, { headers: { 'Authorization': 'Bearer 24b1dcc5cfe9405a87ff99be60510680', "Access-Control-Allow-Origin": "*" } })
            .then((response) => {
                setMessages(response.data.data.messages)
            })
        console.log(messages)
    }

    return <div className="main-container">
        <h1 className="chat-header">{header}</h1>
        <div className="chat-container">
            <ul>
                {messages && messages.map((message) => {
                    <div>{message.text}</div>
                })}
            </ul>
            <input type="text" value={text} onChange={(e) => setText(e.target.value)} />
            <button onClick={(e) => sendMessageToApi(e)}>Send message</button>
        </div>
    </div>
}

export default Main