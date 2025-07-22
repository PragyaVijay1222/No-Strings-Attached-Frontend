import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { NavigationBar } from "../common/NavigationBar";
import { Footer } from "../common/Footer";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export const CheckoutConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const order = location.state?.order;

  const [grouped, setGrouped] = useState([]);

  useEffect(() => {
    if (!order) {
      navigate("/"); 
      return;
    }

    const groupProducts = async () => {
      const groups = {};

      for (const item of order.products) {
        const { sellerId, productId, cost } = item;

        if (!groups[sellerId]) {

          const sellerRes = await fetch(`${BASE_URL}/api/user/${sellerId}`);
          const sellerData = await sellerRes.json();

          groups[sellerId] = {
            sellerName: sellerData.name || "Unknown Seller",
            total: 0,
            products: [],
          };
        }

        const productRes = await fetch(`${BASE_URL}/api/products/${productId}`);
        const productData = await productRes.json();

        groups[sellerId].total += cost;
        groups[sellerId].products.push({
          name: productData.name || "Unnamed Product",
          cost,
        });
      }

      setGrouped(Object.values(groups));
    };

    groupProducts();
  }, [order, navigate]);

  return (
    <div className="flex flex-col min-h-screen">
      <NavigationBar />

      <div className="flex-grow flex flex-col items-center justify-center mt-10 text-center">
        <h1 className="text-4xl font-bold text-green-600 mb-4">Order Confirmed!</h1>
        <p className="text-lg mb-6">Thank you for your purchase. 🎉</p>

        <div className="bg-gray-100 p-6 rounded-lg w-3/4">
          <h2 className="text-xl font-semibold mb-2">Order Summary</h2>

          {grouped.map((group, idx) => (
            <div key={idx} className="border-t pt-2 mt-2 text-left">
              <p><strong>Seller:</strong> {group.sellerName}</p>
              <p><strong>Total:</strong> ₹{group.total}</p>
              <ul className="ml-4 list-disc">
                {group.products.map((p, index) => (
                  <li key={index}>{p.name} - ₹{p.cost}</li>
                ))}
              </ul>
            </div>
          ))}

          <p className="text-lg font-semibold mt-4">Total Paid: ₹{order.total}</p>
        </div>

        <button
          onClick={() => navigate("/profile")}
          className="mt-6 px-6 py-2 bg-[#736246] text-white rounded-lg hover:bg-[#5e5039]"
        >
          Go to Profile
        </button>
      </div>

      <Footer />
    </div>
  );
};
