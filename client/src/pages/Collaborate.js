import "../App.css";
import { useEffect, useState, useRef } from "react";
import useSocket from "../context/SocketContext";

export default function Collaborate() {
    const socket = useSocket(); 
    const [room, setRoom] = useState("");
    const [showDocument, setShowDocument] = useState(false);
    const [content, setContent] = useState("");
    const textAreaRef = useRef(null);

    useEffect(() => {
        if (!socket) {
            console.log("Socket not found!");
            return;
        };
        
        socket.on("receive_message", (data) => {
            console.log("Received message:", data);
        });

        return () => {
            socket.off("receive_message");
        };
    }, [socket])

    const handleNewDocument = () => {
        setShowDocument(true);

        setTimeout(() => {
            if (textAreaRef.current) {
                textAreaRef.current.focus();
            }
        }, 0);
    };

    const sendMessage = () => {
        console.log(content);
        if (!socket) {
            console.log("Socket not found!");
            return;
        }
        socket.emit("send_message", { content, room });
        setContent("");
    };

    return (
        <div className="container">
            <h1>Collaborate</h1>
            <button>Invite Others</button><br />
            <button onClick={ handleNewDocument }>New Document ＋</button>
            {showDocument && (
                <textarea
                    ref={textAreaRef}
                    rows="10"
                    cols="50"
                    placeholder="Start typing your document..."
                    value={content}
                    style={{ display: "block", marginTop: "1rem", width: "100%", height: "300px" }}
                    onChange={(e) => setContent(e.target.value)}
                />
            )}
            <br />
            <button onClick={ sendMessage }>Send</button>
        </div>
    );
};