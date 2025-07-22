import { useRef } from "react";
import { Info } from "lucide-react"
import { useState } from "react";

export const ContentSell = () => {
  const formRef = useRef();
  const [showInfo, setShowInfo] = useState(false);
  const BASE_URL = import.meta.env.VITE_BACKEND_URL;

  async function handleFormSubmit(event) {
    event.preventDefault();

    const formData = new FormData(formRef.current);
    const userPayload = {};

    for (const data of formData.entries()) {
      userPayload[data[0]] = data[1];
    }

    try {
      const response = await fetch(`${BASE_URL}/api/sell/sell`, {
        method: "POST",
        body: JSON.stringify(userPayload),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const result = await response.json();
      if (response.ok) {
        alert("Product submitted successfully!");
      } else {
        alert(result.message || "Something went wrong");
      }
    } catch (err) {
      alert("Something went wrong");
      console.error("Sell form submission failed:", err);
    }
  }

    return(
        <div id="sellContentMainDiv" className="flex flex-row">

        <button className="absolute right-5 top-5 z-10 hover:opacity-75 mt-[25%] mr-[24%]" type="button" onClick={() => setShowInfo((prev) => !prev)}title="Toggle input guide">
        <Info size={20} color="#736246" />
      </button>

            <form action="" method="post" id="sellForm" className="flex flex-col w-full max-w-4xl mx-auto pr-10" onSubmit={(event) => handleFormSubmit(event)} ref={formRef}>
  <div className="flex items-center mb-3">
    <label htmlFor="name" className="w-[150px] mr-30 text-right font-medium">Name:</label>
    <input type="text" name="name" id="name" placeholder="Name of The Product" className="border rounded-lg border-gray-700 focus:border-[#736246] h-10 w-full focus:ring-2 focus:ring-[#736246] outline-none" />
  </div>

  <div className="flex items-center mb-5">
    <label htmlFor="description" className="w-[150px] mr-30 text-right font-medium">Description:</label>
    <textarea name="description" id="description" rows="4" placeholder="Description Of the Product" className="border rounded-lg border-gray-700 focus:border-[#736246] h-10 w-full focus:ring-2 focus:ring-[#736246] outline-none" />
  </div>

  <div className="flex items-center mb-3">
    <label htmlFor="material" className="w-[150px] mr-30 text-right font-medium">Material:</label>
    <input type="text" name="material" id="material" placeholder="Material of The Product" className="border rounded-lg border-gray-700 focus:border-[#736246] h-10 w-full focus:ring-2 focus:ring-[#736246] outline-none" />
  </div>

  <div className="flex items-center mb-3">
    <label htmlFor="old" className="w-[150px] mr-30 text-right font-medium">Condition:</label>
    <input type="text" name="old" id="old" placeholder="New/Used/Mended" className="border rounded-lg border-gray-700 focus:border-[#736246] h-10 w-full focus:ring-2 focus:ring-[#736246] outline-none" />
  </div>

  <div className="flex items-center mb-3">
    <label htmlFor="cost" className="w-[150px] mr-30 text-right font-medium">Price:</label>
    <input type="number" name="cost" id="cost" placeholder="Selling Price in Rupees" className="border rounded-lg border-gray-700 focus:border-[#736246] h-10 w-full focus:ring-2 focus:ring-[#736246] outline-none" />
  </div>

  <div className="flex items-center mb-3">
    <label htmlFor="styleFit" className="w-[150px] mr-30 text-right font-medium">Fit:</label>
    <input type="text" name="styleFit" id="styleFit" placeholder="Female Fit/Male Fit" className="border rounded-lg border-gray-700 focus:border-[#736246] h-10 w-full focus:ring-2 focus:ring-[#736246] outline-none" />
  </div>

  <div className="flex items-center mb-3">
    <label htmlFor="type" className="w-[150px] mr-30 text-right font-medium">Type:</label>
    <input type="text" name="type" id="type" placeholder="Clothing/Accessories" className="border rounded-lg border-gray-700 focus:border-[#736246] h-10 w-full focus:ring-2 focus:ring-[#736246] outline-none" />
  </div>

  <div className="flex items-center mb-3">
    <label htmlFor="size" className="w-[150px] mr-30 text-right font-medium">Size:</label>
    <input type="text" name="size" id="size" placeholder="xxs/xs/s/m/l/xl/xxl/xxxl" className="border rounded-lg border-gray-700 focus:border-[#736246] h-10 w-full focus:ring-2 focus:ring-[#736246] outline-none" />
  </div>

  <div className="flex items-center mb-3">
    <label htmlFor="email" className="w-[150px] mr-30 text-right font-medium">Email:</label>
    <input type="email" name="email" id="email" placeholder="Your Email ID" className="border rounded-lg border-gray-700 focus:border-[#736246] h-10 w-full focus:ring-2 focus:ring-[#736246] outline-none" />
  </div>

  <div className="flex items-center mb-3">
    <label htmlFor="image" className="w-[150px] mr-30 text-right font-medium">Image URL:</label>
    <input type="text" name="image" id="image" placeholder="Image URL" className="border rounded-lg border-gray-700 focus:border-[#736246] h-10 w-full focus:ring-2 focus:ring-[#736246] outline-none" />
  </div>

  <div className="flex items-center mb-7">
    <label htmlFor="upi" className="w-[150px] mr-30 text-right font-medium">UPI ID:</label>
    <input type="text" name="upi" id="upi" placeholder="Your UPI ID" className="border rounded-lg border-gray-700 focus:border-[#736246] h-10 w-full focus:ring-2 focus:ring-[#736246] outline-none" />
  </div>

  <button type="submit" className="border rounded-lg border-gray-700 h-10 w-full hover:bg-[#736246] hover:border-[#736246] hover:text-white active:bg-[#4e3d2c] active:text-white active:border-[#4e3d2c]">
    Submit
  </button>
            </form>

          {showInfo && (
        <div
          id="info"
          className="ml-4 w-[420px] p-5 text-sm text-gray-700 sticky top-10"
        >
          <h2 className="font-medium mb-2 text-[#3b3635]">Input Guidelines</h2>
          <ul className="list-disc pl-5 space-y-2 list-none">
            <li><strong>Name:</strong> Prefer max 3 words (e.g. Denim Jacket)</li>
            <li><strong>Description:</strong> Include care guide and highlights</li>
            <li><strong>Material:</strong> Include lining or attached metalware</li>
            <li><strong>Condition:</strong> New / Used / Mended</li>
            <li><strong>Fit:</strong> Female Fit / Male Fit (labels for reference only)</li>
            <li><strong>Type:</strong> Clothing / Accessories</li>
            <li><strong>Size:</strong> Use predefined options like m / l / xl</li>
            <li><strong>Email:</strong> Must match signup email</li>
            <li><strong>Image:</strong> Good lighting + pastel background</li>
            <li><strong>UPI ID:</strong> Optional; for payments</li>
          </ul>
        </div>
      )}
        </div>
    )
}