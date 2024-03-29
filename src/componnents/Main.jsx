import { useEffect, useState } from "react"
import { redirect, useLocation, useNavigate } from "react-router-dom"

import "./styles/main.css"
import axios from "axios"

function Main({ tokenSent }) {
    const navigate = useNavigate()
    const [token, setToken] = useState()
    const [header, setHeader] = useState("Naujas pokalbis")
    const [text, setText] = useState()
    const [messages, setMessages] = useState(null)
    const [loading, setLoading] = useState(false)
    const [newChat, setNewChat] = useState(true)
    const [chatID, setChatId] = useState()

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
        if (event) {
            event.preventDefault()
            if (newChat) {
                setHeader(text)
                await axios.post("http://172.16.50.58:5000/new", { prompt: text }, { headers: { 'Authorization': 'Bearer 24b1dcc5cfe9405a87ff99be60510680', "Access-Control-Allow-Origin": "*" } })
                setNewChat(false)
                let chats;
                let correctChat;

                await axios.get("http://172.16.50.58:5000/chats", { headers: { 'Authorization': 'Bearer 24b1dcc5cfe9405a87ff99be60510680', "Access-Control-Allow-Origin": "*" } })
                    .then((response) => {
                        chats = response.data
                    })

                chats.forEach(element => {
                    if (element.name === text) {
                        correctChat = element;
                        setChatId(element.id)
                        return
                    }
                });


                setLoading(true)
                setTimeout(async () => {
                    await axios.get(`http://172.16.50.58:5000/chat/${correctChat.id}`, { headers: { 'Authorization': 'Bearer 24b1dcc5cfe9405a87ff99be60510680', "Access-Control-Allow-Origin": "*" } })
                        .then((response) => {
                            setMessages(response.data.data.messages)
                            setLoading(false)
                        })
                }, 5000);
            } else {
                await axios.put(`http://172.16.50.58:5000/chat/${chatID}/reply`, { prompt: text }, { headers: { 'Authorization': 'Bearer 24b1dcc5cfe9405a87ff99be60510680', "Access-Control-Allow-Origin": "*" } })
                setLoading(true)
                setTimeout(async () => {
                    await axios.get(`http://172.16.50.58:5000/chat/${chatID}`, { headers: { 'Authorization': 'Bearer 24b1dcc5cfe9405a87ff99be60510680', "Access-Control-Allow-Origin": "*" } })
                        .then((response) => {
                            setMessages(response.data.data.messages)
                            setLoading(false)
                        })
                }, 5000);
            }
        }

        setText('')

        // const updatedMessages = [
        //     ...sentMessages,
        //     {
        //         sentBy: 'Me',
        //         messageContent: text
        //     }
        // ]

        // setSentMessages(updatedMessages);



    }

    return <div className="main-container">
        <h1 className="chat-header">{header}</h1>
        <div className="chat-container">
            <ul className="chat-box" style={{ alignItems: loading ? 'center' : 'start', justifyContent: loading ? 'center' : 'start' }}>
                {loading ? <span className="loader"></span> : (messages != null ? (messages.map((message) => {
                    console.log(message)
                    return (
                        <li key={message.id}>
                            <p>{message.senderIsAI ? 'AI' : 'You'}</p>
                            <p>{message.text}</p>
                        </li>
                    )
                })) : <></>)}

            </ul>
            <input className="input-box" required='true' type="text" placeholder="Input to start generating new text" value={text} onChange={(e) => setText(e.target.value)} />
            <button className="submit-box" onClick={(e) => sendMessageToApi(e)}> Send message</button>
        </div>
    </div >
}

export default Main