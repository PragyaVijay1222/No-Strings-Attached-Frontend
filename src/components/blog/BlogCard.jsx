
export const BlogCard = () => {


    return(
        <>
        <div id="card" className="flex flex-col rounded-xl bg-[#cadaed] h-50 w-300">
            <div id="productPicture" className="h-35"><img src="/Background/BlogExampleBackground.jpg" className="h-full w-full rounded-xl" /></div>
            <div id="productName" className="mt-2 text-center"><p>This will be the name of the blog</p><div className="text-xs pl-5 pr-5 pt-1"><p>This line will be the description of the blog Lorem ipsum dolor sit amet consectetur adipisicing elit.</p></div></div>
        </div>
        </>
    )
}