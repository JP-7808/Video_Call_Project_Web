import React, { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSocket } from "../context/SocketProvider";

const LobbyScreen = () => {

    const [email, setEmail] = useState('');
    const [room, setRoom] = useState('');

    const socket = useSocket();
    const navigate = useNavigate();
    

    const handleSubmitForm = useCallback((e) => {
        e.preventDefault();
        socket.emit("room:join", {email, room});
    },[email, room, socket])

    const handleJoinRoom = useCallback((data) => {
          const { email, room } = data;
          navigate(`/room/${room}`);
        
        },
        [navigate]
    );

    useEffect(() => {
        socket.on("room:join", handleJoinRoom);
        return () => {
          socket.off("room:join", handleJoinRoom);
        };
      }, [socket, handleJoinRoom]);

    return(
        <div className="text-center">
            <h1 className=" text-center">Lobby</h1>
            <form onSubmit={handleSubmitForm}>
                <label htmlFor="email">Email id</label>
                <input 
                type="email" 
                id="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border-2 border-black ml-2 p-1" 
                />

                <br />

                <label htmlFor="room">Room Number</label>
                <input 
                type="text" 
                id = "room" 
                value={room}
                onChange={(e) => setRoom(e.target.value)}
                className="border-2 border-black ml-2 p-1"
                />

                <div>
                    <button className="border-2 border-black ml-2 p-1">
                        Join
                    </button>
                </div>

            </form>
        </div>
    )
}

export default LobbyScreen;