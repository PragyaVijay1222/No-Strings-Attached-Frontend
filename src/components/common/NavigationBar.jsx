'use client';

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Dialog, DialogPanel, DialogBackdrop } from '@headlessui/react';
import { ChatList } from "../chat/ChatList";
import { useLocation } from 'react-router-dom';
import { XMarkIcon } from "@heroicons/react/24/outline";

export const NavigationBar = () => {

  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const location = useLocation();

  const handleSearch = () => {
    const event = new CustomEvent("global-search", {
      detail: { query, pathname: location.pathname },
    });
    window.dispatchEvent(event);
  };

  return (
    <>
      <div id="navigationDiv" className="sticky top-0 bg-white text-[11px] w-24 h-screen z-50 flex flex-col items-center">
        <button onClick={() => setIsSearchOpen(true)} className="p-4.5 flex flex-col items-center hover:scale-105 transition">
          <img src="/NavigationIcons/search.svg" alt="Search" />
          <p>Search</p>
        </button>
        <Link to="/" className="p-4.5 flex flex-col items-center hover:scale-105 transition">
          <img src="/NavigationIcons/home.svg" alt="Home" />
          <p>Home</p>
        </Link>
        <Link to="/profile" className="p-4.5 flex flex-col items-center hover:scale-105 transition">
          <img src="/NavigationIcons/profile.svg" alt="Profile" />
          <p>Profile</p>
        </Link>
        <Link to="/women" className="p-4.5 flex flex-col items-center hover:scale-105 transition">
          <img src="/NavigationIcons/woman.svg" alt="Women" />
          <p>Women</p>
        </Link>
        <Link to="/men" className="p-4.5 flex flex-col items-center hover:scale-105 transition">
          <img src="/NavigationIcons/man.svg" alt="Men" />
          <p>Men</p>
        </Link>
        <Link to="/accessories" className="p-4.5 flex flex-col items-center hover:scale-105 transition">
          <img src="/NavigationIcons/accessories.svg" alt="Accessories" />
          <p>Accessories</p>
        </Link>
        <Link to="/bag" className="p-4.5 flex flex-col items-center hover:scale-105 transition">
          <img src="/NavigationIcons/bag.svg" alt="Bag" />
          <p>Bag</p>
        </Link>
        <Link to="/favorites" className="p-4.5 flex flex-col items-center hover:scale-105 transition">
          <img src="/NavigationIcons/favorite.svg" alt="Favorites" />
          <p>Favorites</p>
        </Link>
        <button
          onClick={() => setIsChatOpen(true)}
          className="p-4.5 flex flex-col items-center hover:scale-105 transition"
        >
          <img src="/NavigationIcons/chat.svg" alt="Chats" />
          <p>Chats</p>
        </button>

        <Link to="/sell" className="p-4.5 flex flex-col items-center hover:scale-105 transition">
          <img src="/NavigationIcons/sell.svg" alt="Sell" />
          <p>Sell</p>
        </Link>
        <Link to="/donate" className="p-4.5 flex flex-col items-center hover:scale-105 transition">
          <img src="/NavigationIcons/donate.svg" alt="Donate" />
          <p>Donate</p>
        </Link>
        <Link to="/blog" className="p-4.5 flex flex-col items-center hover:scale-105 transition">
          <img src="/NavigationIcons/blog.svg" alt="Blog" />
          <p>Blog</p>
        </Link>
      </div>

      <Dialog open={isChatOpen} onClose={setIsChatOpen} className="relative z-100">
        <DialogBackdrop className="fixed inset-0 bg-black/40" />

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 left-0 flex max-w-full pr-10 sm:pr-16 ">
              <DialogPanel className="pointer-events-auto relative w-screen max-w-sm transform transition duration-500 ease-in-out shadow-xl">
                <div className="mt-10 h-full overflow-y-auto">
                  <ChatList isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
                </div>
              </DialogPanel>
            </div>
          </div>
        </div>
      </Dialog>

      {isSearchOpen && (
        <div className="fixed left-24 top-0 z-[70] w-[500px] h-[80px] bg-white shadow-lg border-none rounded-[4px] mt-2">
          <div className="flex justify-end items-center">
            <button onClick={() => setIsSearchOpen(false)}>
              <XMarkIcon className="w-4 h-4 cursor-pointer" />
            </button>
          </div>
          <div className='flex flex-row mb-4 px-4'>
          <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} className="border border-[#b398a5] rounded-[4px] p-1 w-full text-sm h-9 mt-2 focus:border-[#b398a5]" placeholder="Search Away..." onKeyDown={(e) => e.key === "Enter" && handleSearch()}/>
          <button onClick={handleSearch} className="mt-2 text-sm text-white bg-[#8f6865] m-3 rounded hover:bg-[#b398a5] w-30 h-8">
            Search
          </button>
          </div>
        </div>
      )}
    </>
  );
};
