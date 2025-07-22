import { useRef } from "react";


export const ContentSell = () =>{

    const formRef = useRef();

    async function handleFormSubmit(event){

        event.preventDefault();

        const formData = new FormData(formRef.current);
        const userPayload = {};

        for(const data of formData.entries()){
            userPayload[data[0]] = data[1];
        }

        const response = await fetch("/api/sell/sell",{
            method: "POST",
            body: JSON.stringify(userPayload),
            headers:{
                "Content-Type": "application/json"
            },
            credentials: "include"
        });

        const result = await response.json();
        if (response.ok) {
            alert("Product submitted successfully!");
        } else {
            alert(result.message || "Something went wrong");
        }
    }

    return(
        <div id="sellContentMainDiv" className="flex flex-row">
            <form action="" method="post" id="sellForm" className="flex flex-col w-full max-w-4xl mx-auto" onSubmit={(event) => handleFormSubmit(event)} ref={formRef}>
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

            <div id="info" className="mr-20 w-98">
              <h2 className="font-medium">Information Regarding the Inputs in Form</h2>
              <p>Name - Use the name of the item, not the functionality or any unique property. Prefered max length - 3 words. Ex: Denim Jacket.</p>
              <p>Description - Write about the basic information and any unique selling point. Also add care guide or any required instruction. Ex: Casual indigo blue denim jacket with metal accessories. In great condition. Hand wash only, dry in shade. </p>
              <p>Material - Material of the item including lining or attached metalware/accessories if present. Ex: Denim with cotton lining.</p>
              <p>Condition - New (bought but never used) or Used or Mended (tried as a hobby/ differes from original stitichings/ added something new to it.) </p>
              <p>Fit - Female Fit/ Male Fit (Note: By using these lables for the articles we did not mean it to to categories and differentiate. Buy/sell the items not the labels)</p>
              <p>Type - Clothing / Accessories</p>
              <p>Size - Use one from the size range given. If metrics in number, convert it before putting the value. In case of accessories again change from number to one of the given. Ex: In case of a tote bag: m or xl</p>
              <p>Email - The same email used for signup.</p>
              <p>Image - One is enough. In good lighting and pastel background.</p>
              <p>UPI ID - For making your online transactions seamless. Not mendatory.</p>
            </div>
        </div>
    )
}