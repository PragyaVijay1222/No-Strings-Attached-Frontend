import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io(import.meta.env.VITE_SOCKET_URL, {
  withCredentials: true,
  transports: ["websocket"],
});

export const Chat = ({ productId, userId, sellerId }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const room = `product-${productId}`;
  const BASE_URL = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    socket.emit("joinRoom", { room });

    const fetchHistory = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/chat/${productId}/${userId}`, {
          credentials: "include"
        });
        const data = await res.json();
        setMessages(data);
      } catch (err) {
        console.error("Failed to load chat history:", err);
      }
    };

    fetchHistory();

    socket.on("receiveMessage", (message) => {
      setMessages(prev => {
        const alreadyExists = prev.some(
          m => m.content === message.content && m.senderId === message.senderId
        );
        return alreadyExists ? prev : [...prev, message];
      });
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, [room]);

  const sendMessage = () => {
    if (!input.trim()) return;

    socket.emit("sendMessage", {
      room,
      senderId: userId,
      receiverId: sellerId,
      productId,
      content: input
    });

    setMessages(prev => [...prev, { senderId: userId, content: input }]);
    setInput("");
  };

  return (
    <div className="border border-[#bfb6a6] p-4 rounded w-[49%] ml-[51%]">
      <h2 className="text-lg font-medium mb-2">Live Chat</h2>
      <div className="h-64 overflow-y-scroll mb-2 bg-gray-100 p-2 rounded">
        {messages.map((msg, index) => {
          const isSender = msg.senderId === userId;
          const bubbleStyle = isSender ? "bg-white text-black" : "bg-[#b398a5] text-white";
          const alignment = isSender ? "text-right" : "text-left";
          return (
            <div key={index} className={`mb-1 ${alignment}`}>
              <span className={`inline-block px-2 py-1 rounded shadow ${bubbleStyle}`}>
                {msg.content}
              </span>
            </div>
          );
        })}
      </div>
      <div className="flex gap-2">
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          className="flex-1 border border-[#6e5f53] rounded px-2 py-1"
          placeholder="Type your message..."
        />
        <button
          onClick={sendMessage}
          className="bg-[#8f6865] text-white px-3 py-1 rounded hover:bg-[#b398a5] w-[20%]"
        >
          Send
        </button>
      </div>
    </div>
  );
};
