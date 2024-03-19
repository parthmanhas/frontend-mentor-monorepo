export default function LogoTab() {

    // p-5 on container does not work, width of equal containers changes
    return <div className="rounded-xl inline-flex flex-col justify-end relative overflow-hidden">
        <div className="bg-gradient-radial from-pink-500 via-purple-700 to-blue-500 absolute h-[175%] w-[175%] z-0">
        </div>
        <div className="bg-gradient-radial from-[#7AD8FB] to-white absolute h-[100%] w-[100%] blur-3xl rounded-full translate-x-[-65%] translate-y-[-65%] z-10"></div>
        <div className="bg-gradient-radial bg-[#FBB57A] to-white absolute h-[100%] w-[100%] blur-3xl rounded-full translate-x-[65%] translate-y-[65%] z-10"></div>
        <h1 className="pl-6 z-20">Frontend Mentor</h1>
        <p className="text-sm font-light pl-6 pb-6 z-20">Feedback Board</p>
    </div>
}