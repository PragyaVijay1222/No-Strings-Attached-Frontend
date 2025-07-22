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
    <>

    <div id="companyName">
      <h1 className="text-8xl text-[#736246] ml-4 mt-4 pb-3 herr-von-muellerhoff-regular">No Strings Attached</h1>
    </div>

    <div className="p-6 mt-[2%] ml-[35%]">
      <h1 className="text-2xl text-[#736246] font-semibold mb-4">Scan & Pay</h1>

      {groupedData &&
        Object.entries(groupedData).map(([upi, group], index) => (
          <div key={index} className="mb-6 border border-[#8f6865] rounded-lg p-8 w-[30%]">
            <h2 className="text-lg font-semibold">Seller: {group.sellerName}</h2>
            <p>UPI: {upi}</p>
            <p className="mb-2">Total Amount: ₹{group.total}</p>
            
            <QRCodeSVG
            value={`upi://pay?pa=${upi}&pn=${group.sellerName}&am=${group.total}&cu=INR`}
            size={200} className="ml-13 mt-7"/>
          </div>
        ))}

      <button
        className="bg-[#8f6865] text-white hover:bg-[#736246] hover:border-[#736246] hover:text-white px-6 py-2 rounded"
        onClick={handlePaymentComplete}
      >
        I’ve Paid
      </button>
    </div>
    </>
  );
};
