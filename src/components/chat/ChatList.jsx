import { useEffect, useState } from "react";
import { getUserId } from "../../utils/auth";
import { useNavigate } from "react-router-dom";

export const ChatList = ({ isOpen, onClose }) => {
  const [chats, setChats] = useState([]);
  const userId = getUserId(); 
  const navigate = useNavigate();
  const BASE_URL = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    if (!isOpen) return;

    const fetchChats = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/chat/user/${userId}`, {
          credentials: "include"
        });
        const data = await res.json();

        if (Array.isArray(data)) {
          setChats(data);
        } else {
          console.warn("Unexpected data format:", data);
          setChats([]);
        }
      } catch (err) {
        console.error("Failed to fetch chats:", err.message);
        setChats([]);
      }
    };

    fetchChats();
  }, [isOpen]);

  return (
    <div className={`fixed top-0 w-95 h-full bg-black/60 z-100 transition-transform duration-300 shadow-xl ${isOpen ? "translate-x-0" : "-translate-x-full"}`}>
      <div className="flex justify-between px-4 py-3 border-b border-[#736246]">
        <h2 className="text-2xl font-semibold text-white">Your Chats</h2>
        <button onClick={onClose} className="text-xl font-bold text-white">
          <img src="/NavigationIcons/close (2).svg" alt="Close" />
        </button>
      </div>
      <div className="p-4 overflow-y-auto h-full">
        {chats.length === 0 ? (
          <p className="text-white">No conversations yet.</p>
        ) : (
          chats.map(chat => (
            <div key={chat._id} className="hover:cursor-pointer mb-3 border-none rounded-[4px] bg-[#736246]/40 hover:bg-[#736246]/50 p-3">
              <button
                onClick={() => {
                  navigate(`/chat/${chat.productId}/${userId}/${chat.sellerId}`);
                  onClose();
                }}
                className="w-full text-left"
              >
                <p className="font-medium text-m text-white">{chat.productName}</p>
                <p className="text-sm text-gray-300 truncate">{chat.lastMessage}</p>
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
