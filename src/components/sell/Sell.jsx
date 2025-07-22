import { NavigationBar } from "../common/NavigationBar"
import { Footer } from "../common/Footer"
import { ContentSell } from "./ContentSell"
import { HeaderSell } from "./HeaderSell"
import { Heading } from "./Heading"

export const Sell = () => {

    return(
        <>
        <div id="main" className="flex flex-row">
            <div id="navigation" className="fixed"><NavigationBar /></div>
            <div id="body" className="flex flex-col ml-26 mr-1">
                <div id="header" className="mt-1"><HeaderSell /></div>
                <div id="heading" className="mt-20"><Heading /></div>
                <div id="content" className="flex flex-col justify-center mt-10"><ContentSell /></div>
                <div id="footer" className="mt-20"><Footer /></div>
            </div>
        </div>
        </>
    )
}