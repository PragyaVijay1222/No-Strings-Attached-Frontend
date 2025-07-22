import { useState, useEffect } from "react";
import { getUserId } from "../../utils/auth";
import { useNavigate } from "react-router-dom";

export const ProductCard = ({ data, onRemove = null, onRemoveFav = null }) => {
  const navigate = useNavigate();
  const { _id: productId, name, cost, size, image } = data;

  const [isInCart, setIsInCart] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const userId = getUserId();
  const BASE_URL = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const fetchUserStatus = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/user/${userId}`, {
          credentials: "include"
        });
        const userData = await res.json();
        const bagIds = userData.bag.map(id => id.toString());
        const favoriteIds = userData.favorites.map(id => id.toString());

        setIsInCart(bagIds.includes(productId));
        setIsFavorited(favoriteIds.includes(productId));
      } catch (err) {
        console.error("Error fetching user data:", err);
      } finally {
        setIsLoading(false);
      }
    };

    if (userId) fetchUserStatus();
  }, [userId, productId]);

  const handleCartToggle = async (event) => {
    event.stopPropagation();
    try {
      const endpoint = isInCart
        ? `${BASE_URL}/api/bag/removeFromBag`
        : `${BASE_URL}/api/bag/addToBag`;

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, productId }),
        credentials: "include"
      });

      if (res.ok) {
        setIsInCart(!isInCart);
        if (isInCart && onRemove) {
          onRemove(productId);
        }
      } else {
        const result = await res.json();
        console.error("Cart update failed:", result.message);
      }
    } catch (err) {
      console.error("Cart update failed:", err);
    }
  };

  const handleFavoriteToggle = async (event) => {
    event.stopPropagation();
    try {
      const endpoint = isFavorited
        ? `${BASE_URL}/api/bag/removeFavorite`
        : `${BASE_URL}/api/bag/addFavorite`;

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, productId }),
        credentials: "include"
      });

      if (res.ok) {
        setIsFavorited(!isFavorited);
        if (isFavorited && onRemoveFav) {
          onRemove(productId);
        }
      } else {
        const result = await res.json();
        console.error("Favorite update failed:", result.message);
      }
    } catch (err) {
      console.error("Favorite update failed:", err);
    }
  };

  const handleCardClick = () => {
    navigate(`/product/${productId}`);
  };

  return (
    <div className="relative w-70 cursor-pointer" onClick={handleCardClick}>
      {!isLoading && (
        <button
          onClick={handleCartToggle}
          className={`absolute left-full top-6/7 transform -translate-y-1/2 ml-4 h-24 w-9 rounded text-xs tracking-tight flex items-center justify-center hover:bg-opacity-90 ${
            isInCart ? "bg-[#8f6865] text-white" : "bg-[#b398a5] text-white"
          }`}
          title={isInCart ? "Remove from Cart" : "Add to Cart"}
        >
          <span className="vertical-text">
            {isInCart ? "Remove" : "Add to Cart"}
          </span>
        </button>
      )}

      <div className="absolute top-0 right-0 z-10 p-2">
        {!isLoading && (
          <button onClick={handleFavoriteToggle} className="hover:scale-110 transition" title="Toggle Favorite">
            {isFavorited ? (
              <svg width="24" height="24" fill="red" viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 
                2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 
                3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 
                3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
            ) : (
              <svg width="24" height="24" fill="none" stroke="red" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 
                2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 
                3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 
                3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
            )}
          </button>
        )}
      </div>

      <div className="flex flex-col rounded-xl bg-[#cfcaba] h-[400px] w-70 shadow-md">
        {data.isSold && (
          <div className="absolute top-0 left-0 w-0 h-0 border-l-[60px] border-b-[60px] border-l-red-600 border-b-transparent z-10">
            <span className="absolute top-3 left-[-49px] -rotate-45 text-white text-[10px] font-bold">
              SOLD
            </span>
          </div>
        )}
        <div className="h-[300px]">
          <img
            src={image || "/Background/ExampleCard.jpg"}
            className="h-full w-full rounded-xl"
            alt={name}
          />
        </div>
        <div className="mt-2 text-center justify-between h-22">
          <p className="font-medium">{name}</p>
          <div className="flex flex-row justify-between text-xs pl-5 pr-5 pt-2.5">
            <p>Price: ₹{cost}</p>
            <p>Size: {size}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
