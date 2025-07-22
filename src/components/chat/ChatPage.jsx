import { Footer } from "../common/Footer";
import { HeaderProducts } from "../common/HeaderProducts";
import { NavigationBar } from "../common/NavigationBar";
import { Chat } from "./Chat";
import { useParams } from "react-router-dom";

export const ChatPage = () => {
  const { productId, userId, sellerId } = useParams();
  console.log("ChatPage params:", { productId, userId, sellerId });


  return (
    <div className="flex flex-row">
      <div id="navigation" className="fixed"><NavigationBar /></div>
      <div id="body" className="flex flex-col ml-26 mr-1">
        <div id="header" className="mt-1"><HeaderProducts /></div>
        <div className="mt-20">
        <Chat productId={productId} userId={userId} sellerId={sellerId} />
        </div>
        <div id="footer" className="mt-20"><Footer /></div>
      </div>
    </div>
  );
};