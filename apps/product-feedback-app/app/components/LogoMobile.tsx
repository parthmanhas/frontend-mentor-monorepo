import { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { RxHamburgerMenu } from "react-icons/rx";
import Tags from "./Tags";
import Roadmap from "./Roadmap";

export default function LogoMobile() {

    const [drawerOpen, setDrawerOpen] = useState(false);

    // p-5 on container does not work, width of equal containers changes
    return (
        <div className="w-full">
            <div className="flex justify-between items-center relative overflow-hidden">
                <div className="bg-gradient-radial from-pink-500 via-purple-700 to-blue-500 absolute h-[175%] w-[175%] z-0">
                </div>
                <div className="bg-gradient-radial from-[#7AD8FB] to-white absolute h-[100%] w-[100%] blur-3xl rounded-full translate-x-[-65%] translate-y-[-65%] z-10"></div>
                <div className="bg-gradient-radial bg-[#FBB57A] to-white absolute h-[100%] w-[100%] blur-3xl rounded-full translate-x-[65%] translate-y-[65%] z-10"></div>
                <div className="z-10 pl-6">
                    <h2 className="pt-4 z-20">Frontend Mentor</h2>
                    <p className="text-sm font-light pb-6 z-20">Feedback Board</p>
                </div>
                <div className="z-10 box-content pr-6" onClick={() => setDrawerOpen(!drawerOpen)}>
                    {drawerOpen ? <RxCross2 size={25} /> : <RxHamburgerMenu size={25} />}
                </div>
            </div>
            {drawerOpen && <div className="fixed flex w-full h-[100vh]">
                <div className="bg-black opacity-50 flex-[0.25] h-[full]"></div>
                <div className="flex-[0.75] h-full p-5">
                    <Tags className="mb-5" />
                    <Roadmap />
                </div>
            </div>}
        </div>
    )
}