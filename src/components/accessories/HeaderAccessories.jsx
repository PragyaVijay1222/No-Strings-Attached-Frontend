
export const HeaderAccessories = () =>{


    return(
        <>
        <div id="womenHeader" className="h-80 w-445 flex gap-4 items-center">
         <div id="name" className="flex items-center justify-center text-center border-none rounded-xl h-80 bg-[url(/Background/HomeHeaderBackground.jpg)] bg-no-repeat bg-cover w-221">
            <h1 className="text-9xl text-white pt-4 pb-3">Accessories</h1>
         </div>
         <div id="video" className="rounded-xl h-80 w-221 flex items-center justify-center">
            <video  width="100%" height="100%" autoPlay muted loop className="object-cover h-full w-full rounded-xl">
                <source src="/Background/AccessoriesVideo.mp4" type="video/mp4"/>
            </video>
         </div>
        </div>
        </>
    )
}