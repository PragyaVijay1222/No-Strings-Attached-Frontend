import { ContentsBlog } from "./ContentsBlog"
import { Footer } from "../common/Footer"
import { HeaderBlog} from "./HeaderBlog"
import { NavigationBar } from "../common/NavigationBar"

export const Blog = () => {

    return(
        <>
        <div id="main" className="flex flex-row">
            <div id="navigation" className="fixed"><NavigationBar /></div>
            <div id="body" className="flex flex-col ml-26 mr-1">
                <div id="header" className="mt-1"><HeaderBlog /></div>
                <div id="contents" className="mt-20"><ContentsBlog /></div>
                <div id="footer" className="mt-20"><Footer /></div>
            </div>
        </div>
        </>
    )
}