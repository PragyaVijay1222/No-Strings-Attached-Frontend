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
          image: productData.image || "",
          productId,
        });
      }

      setGrouped(Object.values(groups));
    };

    groupProducts();
  }, [order, navigate]);

  return (
    <>
    <div className="flex flex-row">
      <NavigationBar />
      <div>
            <div id="companyName" className="ml-20">
      <h1 className="text-8xl text-[#736246]  mt-4 pb-3 herr-von-muellerhoff-regular w-[80%]">No Strings Attached</h1>
    </div>
      <div className="flex-grow flex flex-col items-center justify-center mt-10 text-center">
        <h1 className="text-4xl font-bold text-[#736246] mb-4">Order Confirmed!</h1>
        <p className="text-lg mb-6">Thank you for your purchase !</p>

        <div className="bg-gray-100 p-6 rounded-lg w-3/4">
          <h2 className="text-xl font-semibold mb-2">Order Summary</h2>

          {grouped.map((group, idx) => (
            <div key={idx} className="border-t border-[#736246] pt-8 mt-2 text-left">
              <p><strong>Seller:</strong> {group.sellerName}</p>
              <p><strong>Total:</strong> ₹{group.total}</p>
          <ul className="list-disc ml-5 mt-10 flex flex-row justify-between">
            {group.products.map((product) => (
              <div key={idx} className="flex flex-col items-center gap-4 mb-2">
              <img src={product.image} alt={product.name} className="w-60 h-70 object-cover rounded p-4" />
              <span>{product.name} - ₹{product.cost}</span>
              </div>
            ))}
          </ul>
            </div>
          ))}

          <p className="text-lg font-semibold mt-4">Total Paid: ₹{order.total}</p>
        </div>

        <button
          onClick={() => navigate("/profile")}
          className="mt-6 px-6 py-2 bg-[#8f6865] text-white rounded-lg hover:bg-[#5e5039]"
        >
          Go to Profile
        </button>
      </div>

      <Footer />
      </div>
    </div>
    </>
  );
};
