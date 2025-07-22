import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { QRCodeSVG } from "qrcode.react";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export const CheckoutPayment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const groupedData = location.state?.groupedData;

  useEffect(() => {
    if (!groupedData) {
      navigate("/checkout"); 
    }
  }, [groupedData, navigate]);

const placeOrder = async () => {
  const res = await fetch(`${BASE_URL}/api/order/place`, {
    method: "POST",
    credentials: "include",
  });

  if (res.ok) {
    const data = await res.json();
    navigate("/checkout/confirmation", { state: { order: data.order } });
  } else {
    const errorText = await res.text(); 
    console.error("Order placement failed:", errorText);
  }
};

  const handlePaymentComplete = () => {
    placeOrder();
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Scan & Pay</h1>

      {groupedData &&
        Object.entries(groupedData).map(([upi, group], index) => (
          <div key={index} className="border p-4 mb-6 rounded shadow">
            <h2 className="text-lg font-semibold">Seller: {group.sellerName}</h2>
            <p>UPI: {upi}</p>
            <p className="mb-2">Total Amount: ₹{group.total}</p>
            
            <QRCodeSVG
            value={`upi://pay?pa=${upi}&pn=${group.sellerName}&am=${group.total}&cu=INR`}
            size={200}/>
          </div>
        ))}

      <button
        className="mt-4 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded"
        onClick={handlePaymentComplete}
      >
        I’ve Paid
      </button>
    </div>
  );
};
