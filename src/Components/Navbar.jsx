import React from "react";

function Navbar() {
    return(
        <>
        <div className=" p-2 flex justify-around gap-2 w-[100vw] h-[10vh] bg-blue-900">
            <p className="text-lg font-semibold text-white hover:cursor-pointer hover:scale-110 content-center">Home</p>
            <p className="text-lg font-semibold text-white hover:cursor-pointer hover:scale-110 content-center">More</p>
        </div>
        </>
    )
}

export default Navbar;