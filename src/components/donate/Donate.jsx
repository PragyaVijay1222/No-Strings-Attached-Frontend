import { NavigationBar } from "../common/NavigationBar"
import { Footer } from "../common/Footer"

export const Donate = () => {

    return(
        <>
        <div id="main" className="flex flex-row">
            <div id="navigation" className="fixed"><NavigationBar /></div>
            <div id="body" className="flex flex-col ml-26 mr-1">
                <div id="footer" className="mt-20"><Footer /></div>
            </div>
        </div>
        </>
    )
}