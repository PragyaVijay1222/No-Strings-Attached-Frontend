import { useRef } from "react"

export const Footer = () => {

  const formRef = useRef();

  async function handleFormSubmit(event) {
  event.preventDefault();

  const formData = new FormData(formRef.current);
  const userPayload = {};

  for (const data of formData.entries()) {
    userPayload[data[0]] = data[1];
  }

  try {
    const response = await fetch("/api/feedback/feedback", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(userPayload),
      credentials: "include"
    });

    const result = await response.json();

    if (response.ok) {
      alert("Thank you for your feedback!");
      formRef.current.reset();
    } else {
      alert(result.message || "Something went wrong");
    }

    console.log(result);
  } catch (error) {
    console.error("Submission error:", error);
    alert("Failed to submit feedback. Please try again.");
  }
}

    return(
        <>
        <div id="main" className="flex flex-row justify-between mt-12 w-400 ml-20 ">
            <form id="feedbackForm" className="flex flex-col items-center text-center mt-4 " onSubmit={(event) => handleFormSubmit(event)} ref={formRef}>
                <h3 className="mb-5 font-medium">Feedback</h3>
                <input type="text" name="name" placeholder="Name" className="border rounded-lg border-gray-700 focus:border-[#736246] w-full focus:ring-2 focus:ring-[#736246] outline-none h-10 w-70 mb-3"/>
                <input type="email" name="email" placeholder="Email" className="border rounded-lg border-gray-700 focus:border-[#736246] w-full focus:ring-2 focus:ring-[#736246] outline-none h-10 w-70 mb-3"/>
                <textarea name="feedback" rows="10" cols="40" className="border rounded-lg border-gray-700 focus:border-[#736246] w-full focus:ring-2 focus:ring-[#736246] outline-none h-20 w-70 mb-5" placeholder="Feedback/Bugs">
                </textarea>
                <button type="submit" className="border rounded-lg border-gray-700 h-10 w-full hover:bg-[#736246] hover:border-[#736246] hover:text-white active:bg-[#4e3d2c] active:text-white active:border-[#4e3d2c] h-10 w-70 mb-3">Submit!</button>
            </form>
            <div id="termsAndPolicies" className="flex flex-col items-center text-center mt-4 ">
                <h3 className="mb-5 font-medium">Terms & Policies</h3>
                <ul className="list-none">
                    <li className="mb-5 hover:text-[#b07653]">Privacy Policies</li>
                    <li className="mb-5 hover:text-[#b07653]">Terms of Use</li>
                    <li className="mb-5 hover:text-[#b07653]">Code of Conduct</li>
                </ul>
            </div>
            <div id="contacts" className="flex flex-col items-center text-center mt-4">
                <h3 className="mb-5 font-medium">Contact Me</h3>
                <div className="mb-5"><img src="/NavigationIcons/github.png" /></div>
                <div className="mb-5"><img src="/NavigationIcons/linkedin.png" /></div>
                <div><img src="/NavigationIcons/email.png" /></div>
            </div>
        </div>
        </>
    )
}