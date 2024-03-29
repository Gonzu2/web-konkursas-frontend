import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"

import "./styles/chatHistory.css"

function ChatHistory({ tokenSent }) {
    const navigate = useNavigate()
    const [chats, setChats] = useState([])
    const [selectedChat, setSelectedChat] = useState()
    const [messages, setMessages] = useState()
    const [token, setToken] = useState()
    const [text, setText] = useState()
    const [loading, setLoading] = useState(false)

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

    useEffect(() => {
        let chats
        let newChats = []
        async function fetchData() {
            await axios.get("http://172.16.50.58:5000/chats", { headers: { 'Authorization': 'Bearer 24b1dcc5cfe9405a87ff99be60510680', "Access-Control-Allow-Origin": "*" } })
                .then((response) => {
                    chats = response.data
                })

            chats.forEach(chat => {
                newChats.push({ name: chat.name, id: chat.id })
            });
            setChats(newChats)
        }

        fetchData()


    }, [])

    async function fetchData() {
        let chats
        let newChats = []
        await axios.get("http://172.16.50.58:5000/chats", { headers: { 'Authorization': 'Bearer 24b1dcc5cfe9405a87ff99be60510680', "Access-Control-Allow-Origin": "*" } })
            .then((response) => {
                chats = response.data
            })

        chats.forEach(chat => {
            newChats.push({ name: chat.name, id: chat.id })
        });
        setChats(newChats)
    }

    async function sendMessageToApi(event) {
        if (event) {
            event.preventDefault()

            await axios.put(`http://172.16.50.58:5000/chat/${selectedChat.id}/reply`, { prompt: text }, { headers: { 'Authorization': 'Bearer 24b1dcc5cfe9405a87ff99be60510680', "Access-Control-Allow-Origin": "*" } })
            setLoading(true)
            setTimeout(async () => {
                await axios.get(`http://172.16.50.58:5000/chat/${selectedChat.id}`, { headers: { 'Authorization': 'Bearer 24b1dcc5cfe9405a87ff99be60510680', "Access-Control-Allow-Origin": "*" } })
                    .then((response) => {
                        setMessages(response.data.data.messages)
                        setLoading(false)
                    })
            }, 5000);

        }

        setText('')
    }

    async function changeChat(event, chat) {
        event.preventDefault()
        setLoading(true)
        setTimeout(async () => {
            await axios.get(`http://172.16.50.58:5000/chat/${chat.id}`, { headers: { 'Authorization': 'Bearer 24b1dcc5cfe9405a87ff99be60510680', "Access-Control-Allow-Origin": "*" } })
                .then((response) => {
                    setMessages(response.data.data.messages)
                    setLoading(false)
                })
        }, 5000);
        setSelectedChat(chat)
    }

    return (
        <div className="chat-history-container">

            {!selectedChat ?
                (
                    <ul> {
                        chats.map((chat) => {
                            return (
                                <li key={chat.id}>
                                    <div onClick={(e) => {
                                        changeChat(e, chat)
                                    }}>Chat name - <span>{chat.name}</span></div>
                                    <button onClick={async () => {
                                        await axios.delete(`http://172.16.50.58:5000/chat/${chat.id}/delete`, { headers: { 'Authorization': 'Bearer 24b1dcc5cfe9405a87ff99be60510680', "Access-Control-Allow-Origin": "*" } })
                                        setTimeout(() => {
                                            fetchData()
                                        }, 2000);

                                    }}>Delete</button>
                                </li>
                            )
                        })}
                    </ul>) : (
                    <>
                        {
                            <div className="main-container">
                                <h1 className="chat-header">{selectedChat.name}</h1>
                                <div className="chat-container">
                                    <ul className="chat-box" style={{ alignItems: loading ? 'center' : 'start', justifyContent: loading ? 'center' : 'start' }}>
                                        {loading ? <span className="loader"></span> : (messages != null ? (messages.map((message) => {
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
                    </>
                )
            }
        </div>
    )
}

export default ChatHistory